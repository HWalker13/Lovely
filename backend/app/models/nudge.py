from pydantic import BaseModel, Field
from typing import Optional, Dict, Literal
from datetime import datetime, timezone

NudgeType = Literal[
    "profile_completion", 
    "relationship_checkin",
    "anniversary",
    "custom",
]

NudgeStatus = Literal[
    "pending",
    "sent",
    "dismissed"
]

class Nudgev1(BaseModel):
    id: Optional[str] = None

    user_uid: str = Field(..., description="Owner of the nudge")
    type: NudgeType

    title: str
    message: str

    context: Optional[Dict[str, str]] = None
    #Ex: { " missing_field": "love_languages" }
    schedule_for: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    status: NudgeStatus = "pending"
