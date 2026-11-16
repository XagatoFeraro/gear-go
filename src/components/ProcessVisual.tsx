import Icon from "@/components/Icon";

const steps = [
  {
    icon: "search" as const,
    title: "Inspect",
    text: "We check the vehicle and the concern you reported.",
  },
  {
    icon: "message" as const,
    title: "Explain",
    text: "Findings and options are explained in plain language.",
  },
  {
    icon: "shield" as const,
    title: "Approve",
    text: "You see the scope and estimate before paid work.",
  },
  {
    icon: "wrench" as const,
    title: "Repair",
    text: "Agreed work is completed and handed over clearly.",
  },
];

export default function ProcessVisual() {
  return (
    <div className="process-visual">
      <div className="process-visual-head">
        <span className="badge badge-lime no-dot">How a visit works</span>
        <span className="process-visual-kicker">Inspection first</span>
      </div>
      <div className="process-visual-body">
        {steps.map((step, i) => (
          <div className="process-row" key={step.title}>
            <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="process-row-icon">
              <Icon name={step.icon} size="sm" />
            </span>
            <div>
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="process-visual-foot">
        <Icon name="shield" size="sm" /> No paid work starts without your approval.
      </p>
    </div>
  );
}
