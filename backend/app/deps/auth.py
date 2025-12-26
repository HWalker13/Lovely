from fastapi import Header, HTTPException, status
from firebase_admin import auth as firebase_auth
from typing import Optional


def get_current_user_uid(
    authorization: Optional[str] = Header(None),
) -> str:
    print("[AUTH] Dependency entered")

    if authorization is None:
        print("[AUTH] Missing Authorization header")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
        )

    if not authorization.startswith("Bearer "):
        print("[AUTH] Invalid Authorization header format")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header format",
        )

    token = authorization.split("Bearer ")[1].strip()
    print("[AUTH] Token extracted, verifying with Firebase…")

    try:
        decoded_token = firebase_auth.verify_id_token(token)
    except Exception as e:
        print("[AUTH] Token verification FAILED")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    print("[AUTH] Token verified")

    uid = decoded_token.get("uid")

    if not uid:
        print("[AUTH] UID missing in decoded token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    print(f"[AUTH] UID resolved: {uid}")
    return uid
