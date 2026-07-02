// Clutch design tokens — Battlefield-3 HUD language (gunmetal + signal-blue).
// Mirrors the CSS custom properties in `global.css` (`--color-clutch-*`, `--radius-clutch-*`).
// Keep both in sync when a value changes — Tailwind can't read these JS values at build time.

export const colors = {
  // surfaces
  bg: "#0A0E16",
  surface: "#121822",
  surfaceRaised: "#1A222F",
  surfaceSunk: "#07090F",
  border: "#263141",
  borderSoft: "#1B2331",

  // accents
  blue: "#33A1FF", // Signal Blue — primary brand / CTA / active
  blueDim: "#1E6FC4",
  blueWash: "rgba(51,161,255,0.16)",
  amber: "#FFB627", // ratings / in-progress
  teal: "#2FD3B4", // Circuit Teal — success / accepted / completed
  tealWash: "rgba(47,211,180,0.16)",
  cyan: "#4CB8F0", // Signal Cyan — info / links / matched / avatars
  cyanWash: "rgba(76,184,240,0.16)",
  titanium: "#B9AEE0", // neutral accent / tags
  red: "#FF4D6D", // Brake Red — danger / cancel / urgent
  redWash: "rgba(255,77,109,0.16)",

  // text
  text1: "#EAF1F8", // Fog White — primary
  text2: "#93A0B2", // Smoke Gray — secondary
  text3: "#5F6B7D", // Shadow Gray — tertiary / captions
  ink: "#0A0E16", // text/icon ON a blue fill
} as const;

// 3 type roles: Oswald (display, uppercase, HUD callouts), Inter (body), IBM Plex Mono (data/telemetry).
// Values are the exported const names from @expo-google-fonts/* — RN fontFamily takes a single name, no fallback list.
export const fonts = {
  display: "Oswald_600SemiBold", // Display XL/L
  displayMedium: "Oswald_500Medium", // Heading
  displayBold: "Oswald_700Bold",
  body: "Inter_400Regular", // Body L/M/S
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold", // Label
  bodyBold: "Inter_700Bold",
  mono: "IBMPlexMono_500Medium", // Data S
  monoSemiBold: "IBMPlexMono_600SemiBold", // Data L
} as const;

// 4pt base grid. Already native to Tailwind's default spacing scale (1 unit = 4px),
// so use standard classes: p-1=4 · p-2=8 · p-3=12 · p-4=16 · p-6=24 · p-8=32 · p-12=48 · p-16=64.
export const spacing = [4, 8, 12, 16, 24, 32, 48, 64] as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999,
} as const;

// CSS box-shadow strings, mirrored as `--shadow-clutch-*` in global.css.
export const shadows = {
  e1: "0 1px 2px rgba(0,0,0,0.4)", // resting cards
  e2: "0 6px 16px rgba(0,0,0,0.45)", // floating action
  e3: "0 20px 48px rgba(0,0,0,0.55)", // sheets / modals
} as const;

export type JobStatus =
  | "pending"
  | "matched"
  | "enroute"
  | "progress"
  | "complete"
  | "cancelled";

// One color per job status, used identically everywhere (feed cards, trackers, notifications).
export const STATUS: Record<JobStatus, { label: string; color: string; wash: string }> = {
  pending: { label: "Pending", color: colors.text2, wash: "rgba(147,160,178,0.16)" },
  matched: { label: "Matched", color: colors.cyan, wash: colors.cyanWash },
  enroute: { label: "En Route", color: colors.blue, wash: colors.blueWash },
  progress: { label: "In Progress", color: colors.amber, wash: "rgba(255,182,39,0.14)" },
  complete: { label: "Completed", color: colors.teal, wash: colors.tealWash },
  cancelled: { label: "Cancelled", color: colors.red, wash: colors.redWash },
} as const;

// Mechanic reputation ladder — earned through completed jobs, not just star ratings.
export const GRADES = [
  { name: "Apprentice", chevrons: 1, color: colors.titanium },
  { name: "Technician", chevrons: 2, color: colors.cyan },
  { name: "Journeyman", chevrons: 3, color: colors.teal },
  { name: "Master", chevrons: 4, color: colors.blue },
  { name: "Chief", chevrons: 5, color: colors.amber },
] as const;

export const themeTokens = {
  colors,
  fonts,
  spacing,
  radii,
  shadows,
  STATUS,
  GRADES,
} as const;
