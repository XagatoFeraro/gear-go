import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  action?: ReactNode;
};

export default function SectionHead({ eyebrow, title, lede, center = false, action }: Props) {
  if (action) {
    return (
      <div className="section-head-row">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
          {lede ? <p className="section-lede">{lede}</p> : null}
        </div>
        <div className="section-head-action">{action}</div>
      </div>
    );
  }

  return (
    <div className={`section-head${center ? " center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </div>
  );
}
