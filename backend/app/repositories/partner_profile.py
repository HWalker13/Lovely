from app.repositories.firestore import get_db
from app.models.partner_profile import PartnerProfileV1


def get_partner_profile(uid: str):
    db = get_db()
    doc_ref = db.collection("users").document(uid).collection("data").document("partner_profile")
    doc = doc_ref.get()

    if not doc.exists:
        return None

    return doc.to_dict()


def upsert_partner_profile(uid: str, profile: PartnerProfileV1):
    db = get_db()
    doc_ref = db.collection("users").document(uid).collection("data").document("partner_profile")

    doc_ref.set(profile.model_dump(), merge=True)
