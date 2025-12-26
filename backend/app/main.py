from fastapi import FastAPI, Depends
from uuid import uuid4

from app.firebase import init_firebase
from app.deps.auth import get_current_user_uid

from app.repositories.partner_profile import (
    get_partner_profile,
    upsert_partner_profile,
)
from app.repositories.firestore import get_db

from app.models.partner_profile import PartnerProfileV1
from app.models.nudge import Nudgev1
from app.services.nudge_generator import generate_profile_nudges




app = FastAPI()


@app.on_event("startup")
def startup_event():
    init_firebase()


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
        print(f"[PROFILE] uid={uid} → EXISTS: False")
        return {"exists": False, "profile": None}

    print(f"[PROFILE] uid={uid} → EXISTS: True")
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
    db = get_db()

    nudge_id = str(uuid4())
    nudge_dict = nudge.dict()
    nudge_dict.update({
        "id": nudge_id,
        "user_uid": uid,
    })

    db.collection("users") \
      .document(uid) \
      .collection("nudges") \
      .document(nudge_id) \
      .set(nudge_dict)

    return {"id": nudge_id}


@app.get("/nudges")
def list_nudges(uid: str = Depends(get_current_user_uid)):
    db = get_db()

    docs = (
        db.collection("users")
        .document(uid)
        .collection("nudges")
        .order_by("created_at", direction="DESCENDING")
        .stream()
    )

    return [doc.to_dict() for doc in docs]


@app.post("/nudges/generate")
def generate_nudges(uid: str = Depends(get_current_user_uid)):
    db = get_db()

    profile = get_partner_profile(uid)
    nudges = generate_profile_nudges(uid, profile)

    created = []

    for nudge in nudges:
        nudge_id = str(uuid4())
        data = nudge.dict()
        data["id"] = nudge_id

        db.collection("users") \
          .document(uid) \
          .collection("nudges") \
          .document(nudge_id) \
          .set(data)

        created.append(data)

    return {
        "created_count": len(created),
        "nudges": created,
    }




