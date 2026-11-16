type Props = {
  id?: string;
  className?: string;
};

export default function CarArt({ id = "gg-car", className = "" }: Props) {
  return (
    <svg
      className={`car-art ${className}`.trim()}
      viewBox="0 0 760 330"
      role="img"
      aria-label="Illustration of a car"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3f7e3" />
          <stop offset=".5" stopColor="#cfe39d" />
          <stop offset="1" stopColor="#9cbf64" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d9ff4f" stopOpacity=".6" />
          <stop offset="1" stopColor="#9ab877" stopOpacity=".3" />
        </linearGradient>
        <radialGradient id={`${id}-wheel`}>
          <stop offset=".55" stopColor="#1a211c" />
          <stop offset=".72" stopColor="#39443a" />
          <stop offset="1" stopColor="#0d1410" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <ellipse cx="380" cy="288" rx="285" ry="25" fill="#000" opacity=".36" filter={`url(#${id}-shadow)`} />
      <path
        d="M82 238c2-28 22-49 58-58l80-19 48-55c14-16 34-25 55-25h128c24 0 46 11 60 30l38 52 78 16c28 6 44 22 48 48l3 18c1 9-5 16-14 16H94c-9 0-15-8-12-17z"
        fill={`url(#${id}-body)`}
      />
      <path
        d="M247 160l39-45c11-13 27-20 44-20h106c18 0 35 8 46 22l31 42z"
        fill={`url(#${id}-glass)`}
        stroke="#4f6342"
        strokeOpacity=".4"
      />
      <path d="M378 96v64M462 96l29 64" stroke="#3f5137" strokeWidth="2.5" opacity=".4" />
      <path d="M92 221c90 7 207 10 322 8 100-2 198-8 289-18" fill="none" stroke="#3c4b34" strokeWidth="2" opacity=".28" />
      <path d="M643 187c25 4 43 13 53 28" fill="none" stroke="#f2f5e8" strokeWidth="3" opacity=".6" />
      <rect x="112" y="209" width="34" height="9" rx="4.5" fill="#fff" opacity=".9" />
      <rect x="610" y="204" width="42" height="10" rx="5" fill="#d9ff4f" />
      <path d="M89 253h642" stroke="#23301f" strokeWidth="1" opacity=".25" />
      {[202, 588].map((x) => (
        <g transform={`translate(${x} 259)`} key={x}>
          <circle r="48" fill="#0d1410" />
          <circle r="39" fill={`url(#${id}-wheel)`} stroke="#90a78e" strokeWidth="2" />
          <circle r="24" fill="#141c16" stroke="#a9bd9f" strokeWidth="3" />
          <circle r="7" fill="#d9ff4f" />
          <g stroke="#9cae94" strokeWidth="4">
            <path d="M0-22V22M-22 0H22M-15-15 15 15M15-15-15 15" />
          </g>
        </g>
      ))}
      <path d="M236 230h101M486 230h75" stroke="#2a3627" strokeWidth="2" opacity=".25" />
    </svg>
  );
}
