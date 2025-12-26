from typing import List
from app.models.nudge import Nudgev1


def generate_profile_nudges(uid: str, profile) -> List[Nudgev1]:
    """
    Generate nudges based on the user's partner profile state.
    Pure logic. No Firestore access here.
    """
    nudges: List[Nudgev1] = []

    # Case 1: No profile at all
    if profile is None:
        nudges.append(
            Nudgev1(
                user_uid=uid,
                type="profile_completion",
                title="Let’s get started",
                message="Tell us about your partner to unlock insights.",
            )
        )
        return nudges

    # Case 2: Missing love languages
    if not profile.love_languages:
        nudges.append(
            Nudgev1(
                user_uid=uid,
                type="profile_completion",
                title="Add love languages",
                message="Understanding love languages helps us personalize advice.",
                context={"missing_field": "love_languages"},
            )
        )

    # Case 3: Missing important dates
    if not profile.important_dates:
        nudges.append(
            Nudgev1(
                user_uid=uid,
                type="profile_completion",
                title="Add important dates",
                message="Birthdays and anniversaries help us send timely reminders.",
                context={"missing_field": "important_dates"},
            )
        )

    return nudges
