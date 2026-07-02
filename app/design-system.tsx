import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, GRADES, STATUS, type JobStatus } from "@/theme";

const swatches: { name: string; role: string; hex: string; className: string }[] = [
  { name: "Gunmetal Black", role: "App background", hex: colors.bg, className: "bg-clutch-bg" },
  { name: "Steel Panel", role: "Card / surface", hex: colors.surface, className: "bg-clutch-surface" },
  { name: "Panel Raised", role: "Elevated / sheets", hex: colors.surfaceRaised, className: "bg-clutch-surface-raised" },
  { name: "Rivet Line", role: "Borders / dividers", hex: colors.border, className: "bg-clutch-border" },
  { name: "Signal Blue", role: "Primary brand / CTA", hex: colors.blue, className: "bg-clutch-blue" },
  { name: "Caution Amber", role: "Ratings / in-progress", hex: colors.amber, className: "bg-clutch-amber" },
  { name: "Circuit Teal", role: "Success / accepted", hex: colors.teal, className: "bg-clutch-teal" },
  { name: "Titanium", role: "Neutral accent / tags", hex: colors.titanium, className: "bg-clutch-titanium" },
  { name: "Signal Cyan", role: "Info / links / matched", hex: colors.cyan, className: "bg-clutch-cyan" },
  { name: "Brake Red", role: "Danger / cancel / urgent", hex: colors.red, className: "bg-clutch-red" },
];

const statusOrder: JobStatus[] = ["pending", "matched", "enroute", "progress", "complete", "cancelled"];

const principles = [
  {
    num: "01 / STATUS CLARITY",
    title: "Status is never ambiguous",
    body: "Every job, mechanic, and payout is legible at a glance — one color, one word, one number.",
  },
  {
    num: "02 / EARNED REPUTATION",
    title: "Trust is a progression",
    body: "Mechanics grade up from Apprentice to Chief through completed jobs, not just stars.",
  },
  {
    num: "03 / SIGNAL RESTRAINT",
    title: "One accent does the talking",
    body: "Signal blue is spent on actions and alerts only. The rest of the interface stays quiet steel.",
  },
];

const typeRows = [
  { meta: "Display XL · Oswald 600 · 34/40", className: "font-display text-[34px] leading-[40px] uppercase text-clutch-text-1", sample: "Post a Job" },
  { meta: "Display L · Oswald 600 · 28/34", className: "font-display text-[28px] leading-[34px] uppercase text-clutch-text-1", sample: "Job Board" },
  { meta: "Heading · Oswald 500 · 20/26", className: "font-display-medium text-[20px] leading-[26px] uppercase tracking-[0.02em] text-clutch-text-1", sample: "Brake Inspection" },
  { meta: "Body L · Inter 400 · 17/24", className: "font-body text-[17px] leading-[24px] text-clutch-text-1", sample: "Mike is 12 minutes away and will call when he arrives." },
  { meta: "Body M · Inter 400 · 15/21", className: "font-body text-[15px] leading-[21px] text-clutch-text-2", sample: "Includes diagnostic check, pad replacement, rotor inspection." },
  { meta: "Body S · Inter 400 · 13/18", className: "font-body text-[13px] leading-[18px] text-clutch-text-2", sample: "Posted 4 minutes ago · Colorado Springs, CO" },
  { meta: "Label · Inter 600 · 12/16", className: "font-body-semibold text-[12px] uppercase tracking-[0.1em] text-clutch-blue", sample: "Nearby Mechanics" },
  { meta: "Data L · Plex Mono 600 · 22/28", className: "font-mono-semibold text-[22px] leading-[28px] text-clutch-text-1", sample: "$96.50" },
  { meta: "Data S · Plex Mono 500 · 13/18", className: "font-mono text-[13px] leading-[18px] text-clutch-text-2", sample: "ETA 00:12:44 · JOB #4471" },
];

function Chevron({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: color,
      }}
    />
  );
}

export default function DesignSystem() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView className="flex-1 bg-clutch-bg" contentContainerStyle={{ paddingBottom: 48 }}>
        {/* ---- Brand bar ---- */}
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <View className="flex-row items-center gap-2">
            <View className="h-6 w-6 rotate-45 rounded-sm bg-clutch-blue" />
            <Text className="font-display text-lg uppercase tracking-[0.2em] text-clutch-text-1">Clutch</Text>
          </View>
          <View className="rounded-clutch-pill border border-clutch-border bg-clutch-surface px-3 py-1">
            <Text className="font-mono text-[10px] uppercase tracking-[0.14em] text-clutch-text-3">v1.0 · iOS</Text>
          </View>
        </View>

        {/* ---- Hero ---- */}
        <View className="px-5 pb-8 pt-4">
          <Text className="font-mono text-[12px] uppercase tracking-[0.14em] text-clutch-blue">
            Design System — Native iOS
          </Text>
          <Text className="mt-3 font-display text-[40px] uppercase leading-[42px] text-clutch-text-1">
            Road-ready design for auto repair, <Text className="text-clutch-blue">on demand.</Text>
          </Text>
          <Text className="mt-4 font-body text-[15px] leading-[22px] text-clutch-text-2">
            CLUTCH connects drivers who need a repair with mechanics who take the job — rendered through a
            diagnostic HUD language: signal-blue callouts, teal status states, and skill tiers earned on the job.
          </Text>

          <View className="mt-4 flex-row flex-wrap gap-2">
            {["Motorsport Telemetry HUD", "iOS · SF Symbols", "Customers + Mechanics", "Dark-first"].map((tag) => (
              <View key={tag} className="rounded-clutch-pill border border-clutch-border px-3 py-2">
                <Text className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-clutch-text-2">{tag}</Text>
              </View>
            ))}
          </View>

          <View className="mt-6 flex-row flex-wrap gap-3">
            {principles.map((p) => (
              <View key={p.num} className="clutch-card w-full gap-2 p-4">
                <Text className="font-mono text-[11px] text-clutch-blue">{p.num}</Text>
                <Text className="font-body-bold text-[15px] text-clutch-text-1">{p.title}</Text>
                <Text className="font-body text-[13px] leading-[19px] text-clutch-text-2">{p.body}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ---- Color ---- */}
        <View className="px-5 py-6">
          <Text className="font-mono text-[11px] uppercase tracking-[0.16em] text-clutch-blue">01 — Foundations</Text>
          <Text className="mt-2 font-display text-[28px] uppercase text-clutch-text-1">Color</Text>
          <Text className="mt-2 font-body text-[14px] leading-[20px] text-clutch-text-2">
            Gunmetal panels, signal-blue callouts, teal and titanium shop tones, caution amber, signal cyan, and
            brake red — remapped to real product semantics.
          </Text>

          <View className="mt-5 flex-row flex-wrap gap-3">
            {swatches.map((swatch) => (
              <View key={swatch.name} className="clutch-card w-[47%] overflow-hidden">
                <View className={`h-20 ${swatch.className}`} />
                <View className="px-3 py-3">
                  <Text className="font-body-bold text-[13px] text-clutch-text-1">{swatch.name}</Text>
                  <Text className="mt-1 font-body text-[11px] text-clutch-text-3">{swatch.role}</Text>
                  <Text className="mt-2 font-mono text-[11px] text-clutch-text-2">{swatch.hex}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text className="mt-6 font-display-medium text-[18px] uppercase text-clutch-text-1">
            Job status semantics
          </Text>
          <Text className="mt-1 font-body text-[13px] text-clutch-text-2">
            One color per state, used identically everywhere — feed cards, trackers, notifications.
          </Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {statusOrder.map((key) => {
              const status = STATUS[key];
              return (
                <View
                  key={key}
                  className={`clutch-status-pill clutch-status-pill--${key} flex-row items-center gap-2 px-3 py-1.5`}
                >
                  <View className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                  <Text
                    className="font-mono text-[11px] uppercase tracking-[0.03em]"
                    style={{ color: status.color }}
                  >
                    {status.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ---- Typography ---- */}
        <View className="px-5 py-6">
          <Text className="font-mono text-[11px] uppercase tracking-[0.16em] text-clutch-blue">02 — Foundations</Text>
          <Text className="mt-2 font-display text-[28px] uppercase text-clutch-text-1">Typography</Text>

          <View className="mt-4 gap-4">
            {typeRows.map((row) => (
              <View key={row.meta} className="clutch-card gap-2 p-4">
                <Text className="font-mono text-[10.5px] text-clutch-text-3">{row.meta}</Text>
                <Text className={row.className}>{row.sample}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ---- Components ---- */}
        <View className="px-5 py-6">
          <Text className="font-mono text-[11px] uppercase tracking-[0.16em] text-clutch-blue">03 — Components</Text>
          <Text className="mt-2 font-display text-[28px] uppercase text-clutch-text-1">Components</Text>

          {/* Buttons */}
          <Text className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-clutch-text-3">Buttons</Text>
          <View className="clutch-card mt-2 flex-row flex-wrap gap-2 p-4">
            <View className="clutch-btn clutch-btn--primary px-5 py-3">
              <Text className="font-body-bold text-[14px] text-clutch-ink">Post a Job</Text>
            </View>
            <View className="clutch-btn clutch-btn--secondary px-5 py-3">
              <Text className="font-body-bold text-[14px] text-clutch-text-1">View Details</Text>
            </View>
            <View className="clutch-btn clutch-btn--ghost px-5 py-3">
              <Text className="font-body-bold text-[14px] text-clutch-blue">Decline</Text>
            </View>
            <View className="clutch-btn clutch-btn--destructive px-5 py-3">
              <Text className="font-body-bold text-[14px] text-clutch-ink">Cancel Job</Text>
            </View>
            <View className="clutch-btn clutch-btn--disabled px-5 py-3">
              <Text className="font-body-bold text-[14px] text-clutch-text-3">Unavailable</Text>
            </View>
            <View className="clutch-btn clutch-btn--primary px-4 py-2">
              <Text className="font-body-bold text-[12.5px] text-clutch-ink">Accept · $65</Text>
            </View>
          </View>

          {/* Grade ladder */}
          <Text className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-clutch-text-3">
            Certification tier — mechanic reputation
          </Text>
          <View className="clutch-card mt-2 flex-row flex-wrap gap-3 p-4">
            {GRADES.map((grade) => (
              <View
                key={grade.name}
                className="flex-row items-center gap-2 rounded-clutch-pill border border-clutch-border bg-clutch-surface-raised px-3 py-2"
              >
                <View className="gap-0.5">
                  {Array.from({ length: grade.chevrons }).map((_, i) => (
                    <Chevron key={i} color={grade.color} />
                  ))}
                </View>
                <Text
                  className="font-mono-semibold text-[12px] uppercase tracking-[0.05em]"
                  style={{ color: grade.color }}
                >
                  {grade.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Profile / rating */}
          <Text className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-clutch-text-3">
            Rating &amp; profile
          </Text>
          <View className="clutch-card mt-2 flex-row items-center gap-3 p-4">
            <View className="h-[52px] w-[52px] rounded-full border-2 border-clutch-border bg-clutch-cyan" />
            <View>
              <Text className="font-body-bold text-[14.5px] text-clutch-text-1">Mike Alvarez</Text>
              <Text className="mt-1 font-mono text-[12px] text-clutch-amber">★★★★★ 4.9 · 247 jobs</Text>
            </View>
          </View>

          {/* Job card */}
          <Text className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-clutch-text-3">
            Job cards — feed &amp; offer
          </Text>
          <View className="clutch-card mt-2 gap-3 p-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-clutch-md border border-clutch-border bg-clutch-surface">
                  <Text className="text-clutch-blue">🔧</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-body-bold text-[14.5px] text-clutch-text-1">Brakes grinding, rear left</Text>
                  <Text className="mt-0.5 font-body text-[12px] text-clutch-text-3">2.3 mi · Posted 4 min ago</Text>
                </View>
              </View>
              <View className="clutch-status-pill clutch-status-pill--enroute px-3 py-1">
                <Text className="font-mono text-[10.5px] uppercase text-clutch-blue">Priority</Text>
              </View>
            </View>
            <Text className="font-mono-semibold text-[19px] text-clutch-blue">$65.00</Text>
            <View className="flex-row gap-2">
              <View className="clutch-btn clutch-btn--secondary flex-1 items-center py-2.5">
                <Text className="font-body-bold text-[13px] text-clutch-text-1">Decline</Text>
              </View>
              <View className="clutch-btn clutch-btn--primary flex-1 items-center py-2.5">
                <Text className="font-body-bold text-[13px] text-clutch-ink">Accept</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
