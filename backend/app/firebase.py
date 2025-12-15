import firebase_admin
from firebase_admin import credentials


def init_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate(
            "firebase-service-account.json"
        )
        firebase_admin.initialize_app(cred)
