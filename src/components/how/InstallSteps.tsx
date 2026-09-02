import { Tabs } from "@/components/ui/Tabs";

const ios = [
  "Open Settings → Mobile Service → Add eSIM.",
  "Tap “Use QR Code” and scan the code from your confirmation.",
  "Label the plan (e.g. “Velusim Japan”) and continue.",
  "Turn on Data Roaming for the Velusim line — this uses the local network, not your home carrier.",
  "Set Velusim as your Mobile Data line and you're online.",
];

const android = [
  "Open Settings → Network & internet → SIMs.",
  "Tap “Add eSIM” / “Download a SIM instead”.",
  "Scan the QR code from your confirmation email.",
  "Enable the Velusim eSIM and turn on Roaming for that SIM.",
  "Select Velusim for mobile data and you're connected.",
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-soft font-mono text-sm font-semibold text-emerald">
            {i + 1}
          </span>
          <span className="pt-0.5 text-pretty text-ink">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function InstallSteps() {
  return (
    <Tabs
      tabs={[
        { id: "ios", label: "iPhone (iOS)", content: <StepList steps={ios} /> },
        { id: "android", label: "Android", content: <StepList steps={android} /> },
      ]}
    />
  );
}
