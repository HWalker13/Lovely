from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud.firestore import Query
from pydantic import ValidationError
from uuid import uuid4

from app.firebase import init_firebase
from app.deps.auth import get_current_user_uid

from app.repositories.partner_profile import (
    get_partner_profile,
    upsert_partner_profile,
)
from app.repositories.nudge import (
    create_nudge as create_nudge_repo,
    list_nudges as list_nudges_repo,
)

from app.models.partner_profile import PartnerProfileV1
from app.models.nudge import Nudgev1
from app.services.nudge_generator import generate_profile_nudges




@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_firebase()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/me")
def get_me(uid: str = Depends(get_current_user_uid)):
    return {"uid": uid}


@app.get("/partner-profile")
def read_partner_profile(uid: str = Depends(get_current_user_uid)):
    profile = get_partner_profile(uid)

    if profile is None:
        return {"exists": False, "profile": None}

    return {"exists": True, "profile": profile}



@app.put("/partner-profile")
def write_partner_profile(
    profile: PartnerProfileV1,
    uid: str = Depends(get_current_user_uid),
):
    upsert_partner_profile(uid, profile)
    return {"status": "ok"}


@app.post("/nudges")
def create_nudge(
    nudge: Nudgev1,
    uid: str = Depends(get_current_user_uid),
):
    nudge_id = str(uuid4())
    nudge_dict = nudge.model_dump()
    nudge_dict.update({
        "id": nudge_id,
        "user_uid": uid,
    })

    create_nudge_repo(uid, nudge_id, nudge_dict)

    return {"id": nudge_id}


@app.get("/nudges")
def list_nudges(uid: str = Depends(get_current_user_uid)):
    return list_nudges_repo(uid, direction=Query.DESCENDING)


@app.post("/nudges/generate")
def generate_nudges(uid: str = Depends(get_current_user_uid)):
    profile = get_partner_profile(uid)
    try:
        profile_model = (
            PartnerProfileV1(**profile) if profile is not None else None
        )
    except ValidationError:
        raise HTTPException(
            status_code=400,
            detail="Invalid partner profile",
        )
    nudges = generate_profile_nudges(uid, profile_model)

    created = []

    for nudge in nudges:
        nudge_id = str(uuid4())
        data = nudge.model_dump()
        data["id"] = nudge_id

        create_nudge_repo(uid, nudge_id, data)

        created.append(data)

    return {
        "created_count": len(created),
        "nudges": created,
    }
