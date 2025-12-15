from pydantic import BaseModel, Field
from typing import List, Optional, Dict


class ImportantDates(BaseModel):
    birthday: Optional[str] = None
    anniversary: Optional[str] = None
    other: Optional[Dict[str, str]] = None
    # example: { "first_date": "2023-04-10" }


class RelationshipContext(BaseModel):
    user_name: Optional[str] = None
    partner_name: Optional[str] = None
    relationship_stage: Optional[str] = None
    relationship_start_date: Optional[str] = None


class GrowthIntent(BaseModel):
    user_goals: Optional[List[str]] = None
    partner_expressed_needs: Optional[List[str]] = None
    relationship_vision: Optional[str] = None


class PartnerProfileV1(BaseModel):
    context: RelationshipContext = Field(...)

    pronouns: Optional[str] = None
    important_dates: Optional[ImportantDates] = None

    preferences: Optional[List[str]] = None
    love_languages: Optional[List[str]] = None
    boundaries: Optional[List[str]] = None

    growth_intent: Optional[GrowthIntent] = None

    notes: Optional[str] = None


