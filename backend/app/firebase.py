# app/firebase.py

import os

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials

def init_firebase():
    if firebase_admin._apps:
        return

    load_dotenv()
    service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")
    if not service_account_path:
        raise ValueError("FIREBASE_SERVICE_ACCOUNT_PATH is not set")

    cred = credentials.Certificate(service_account_path)

    firebase_admin.initialize_app(cred)
