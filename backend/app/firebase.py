# app/firebase.py

import firebase_admin
from firebase_admin import credentials

import os

def init_firebase():
    if firebase_admin._apps:
        return

    # Path to your service account key
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    SERVICE_ACCOUNT_PATH = os.path.join(
        BASE_DIR,
        "firebase-service-account.json"
    )

    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)

    firebase_admin.initialize_app(cred)

    print("[FIREBASE] Admin SDK initialized")


