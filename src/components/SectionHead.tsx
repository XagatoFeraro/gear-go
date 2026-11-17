import type { ReactNode } from "react";

type Props = {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  action?: ReactNode;
  wide?: boolean;
};

export default function SectionHead({
  label,
  title,
  lede,
  center = false,
  action,
  wide = false,
}: Props) {
  const head = (
    <div className={`sec-head${wide ? " sec-head--wide" : ""}${center ? " center" : ""}`}>
      {label ? <span className="label">{label}</span> : null}
      <h2 className="sec-head__title">{title}</h2>
      {lede ? <p className="sec-head__lede">{lede}</p> : null}
    </div>
  );

  if (action) {
    return (
      <div className="sec-head-row">
        {head}
        <div>{action}</div>
      </div>
    );
  }

  return head;
}
