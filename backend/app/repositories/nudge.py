from typing import Any, Dict, List

from google.cloud.firestore import Query

from app.repositories.firestore import get_db


def create_nudge(uid: str, nudge_id: str, data: Dict[str, Any]) -> None:
    db = get_db()
    db.collection("users") \
      .document(uid) \
      .collection("nudges") \
      .document(nudge_id) \
      .set(data)


def list_nudges(
    uid: str,
    direction: Query.Direction = Query.DESCENDING,
) -> List[Dict[str, Any]]:
    db = get_db()
    docs = (
        db.collection("users")
        .document(uid)
        .collection("nudges")
        .order_by("created_at", direction=direction)
        .stream()
    )

    return [doc.to_dict() for doc in docs]
