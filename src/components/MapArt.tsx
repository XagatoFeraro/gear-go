import Icon from "@/components/Icon";

type Props = {
  label?: string;
  className?: string;
};

export default function MapArt({ label = "Gear Go Automobiles · Aya Nagar", className = "" }: Props) {
  return (
    <div className={`map-art ${className}`.trim()} role="img" aria-label={`Schematic map showing the Gear Go Automobiles location in Aya Nagar, New Delhi. ${label}.`}>
      <svg viewBox="0 0 600 380" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="380" fill="#131c16" />
        <g stroke="#2c3a2e" strokeWidth="1">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <line x1="0" y1={i * 42} x2="600" y2={i * 42} />
              <line x1={i * 65} y1="0" x2={i * 65} y2="380" />
            </g>
          ))}
        </g>
        <path d="M-20 280C110 240 160 180 255 190s170 55 360-30" fill="none" stroke="#4d624c" strokeWidth="18" opacity=".5" />
        <path d="M-20 280C110 240 160 180 255 190s170 55 360-30" fill="none" stroke="#8ba887" strokeWidth="1.5" strokeDasharray="8 8" />
        <path d="M100-10c20 110 70 150 50 220s-20 100 50 180" fill="none" stroke="#4d624c" strokeWidth="10" opacity=".4" />
        <path d="M420-10c-20 80-15 120 10 170s40 150-20 230" fill="none" stroke="#4d624c" strokeWidth="7" opacity=".35" />
        <circle cx="200" cy="155" r="4" fill="#8ba887" />
        <circle cx="365" cy="225" r="4" fill="#8ba887" />
        <circle cx="470" cy="125" r="4" fill="#8ba887" />
        <text x="190" y="145" fontSize="9" fill="#7e937a">Chhatarpur</text>
        <text x="365" y="245" fontSize="9" fill="#7e937a">Saket</text>
        <text x="450" y="115" fontSize="9" fill="#7e937a">Vasant Kunj</text>
        <text x="68" y="330" fontSize="9" fill="#7e937a">Gurugram</text>
        <text x="486" y="330" fontSize="9" fill="#7e937a">Faridabad</text>
        <circle cx="290" cy="205" r="80" fill="none" stroke="#d9ff4f" strokeWidth="1" strokeDasharray="4 6" opacity=".45" />
      </svg>
      <div className="map-pin">
        <span className="dot">
          <Icon name="pin" />
        </span>
        <span>{label}</span>
      </div>
      <span className="map-note">Schematic map — open directions for the live route</span>
    </div>
  );
}
