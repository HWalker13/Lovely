from fastapi import FastAPI, Depends
from app.firebase import init_firebase
from app.deps.auth import get_current_user_uid
from app.repositories.partner_profile import (
    get_partner_profile,
    upsert_partner_profile,
)
from app.models.partner_profile import PartnerProfileV1
from app.models.nudge import Nudgev1
from fastapi import Depends
from uuid import uuid4
from app.repositories.firestore import get_db



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

