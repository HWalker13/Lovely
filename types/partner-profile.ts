export interface RelationshipContext {
  user_name?: string;
  partner_name?: string;
  relationship_stage?: string;
  relationship_start_date?: string;
}

export interface ImportantDates {
  birthday?: string;
  anniversary?: string;
  other?: Record<string, string>;
}

export interface GrowthIntent {
  user_goals?: string[];
  partner_expressed_needs?: string[];
  relationship_vision?: string;
}

export interface PartnerProfile {
  context: RelationshipContext;
  pronouns?: string;
  important_dates?: ImportantDates;
  preferences?: string[];
  love_languages?: string[];
  boundaries?: string[];
  growth_intent?: GrowthIntent;
  notes?: string;
}
