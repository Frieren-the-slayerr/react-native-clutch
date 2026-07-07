/** Supported interface/content languages for the learning flow. */
export type LanguageCode = "en" | "es";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
}

/** What the customer typed in when posting the job. */
export interface CustomerRequest {
  customerName: string;
  vehicle: string;
  issue: string;
  urgency: "low" | "medium" | "high";
}

/** How the job appears on the mechanic-facing job board. */
export interface JobBoardPosting {
  id: string;
  title: string;
  distanceMiles: number;
  payoutEstimate: string;
  status: "open" | "accepted" | "in_progress" | "completed";
}

export interface PartNeeded {
  name: string;
  quantity: number;
  estimatedCost: string;
}

export interface ChatMessage {
  sender: "customer" | "mechanic" | "ai";
  message: string;
}

/** The mechanic's write-up after inspecting the vehicle. */
export interface DiagnosticSheet {
  symptoms: string[];
  findings: string[];
  recommendedFix: string;
}

export interface JobLocation {
  label: string;
  city: string;
  state: string;
}

/** A line the AI customer-support agent uses to explain the diagnosis in plain language. */
export interface AIPrompt {
  prompt: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  title: string;
  order: number;
  xp: number;
  customerRequest: CustomerRequest;
  jobBoardPosting: JobBoardPosting;
  partsNeeded: PartNeeded[];
  chat: ChatMessage[];
  diagnosticSheet: DiagnosticSheet;
  location: JobLocation;
  aiPrompts: AIPrompt[];
}
