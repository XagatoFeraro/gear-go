import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  text?: ReactNode;
  actions: ReactNode;
};

export default function CtaBand({ title, text, actions }: Props) {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{title}</h2>
          {text ? <p>{text}</p> : null}
        </div>
        <div className="btn-group">{actions}</div>
      </div>
    </section>
  );
}
