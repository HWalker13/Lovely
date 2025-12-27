from firebase_admin import firestore
from typing import Optional

_db: Optional[firestore.Client] = None


def get_db() -> firestore.Client:
    global _db
    if _db is None:
        _db = firestore.client()
    return _db
