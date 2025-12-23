from firebase_admin import credentials, initialize_app

def init_firebase():
    cred = credentials.ApplicationDefault()
    initialize_app(cred)

