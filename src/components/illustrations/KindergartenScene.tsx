/**
 * Иллюстрация-заглушка для главного экрана.
 * Заменяется автоматически, когда появляется public/images/main-page.png.
 */
export function KindergartenScene({ className, label }: { className?: string; label: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ks-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDEFEA" />
          <stop offset="1" stopColor="#FFF4DA" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#ks-sky)" />

      {/* солнце */}
      <circle cx="312" cy="86" r="34" fill="#FFCA55" />
      <circle cx="312" cy="86" r="48" fill="#FFCA55" opacity="0.25" />

      {/* облака */}
      <g fill="#fff">
        <path d="M70 110c-12 0-20-7-20-15s7-14 15-14c2-10 10-16 20-16 9 0 16 5 19 13h4c10 0 18 7 18 16s-8 16-18 16z" />
        <path d="M228 66c-8 0-13-5-13-10s5-9 10-9c1-7 7-11 13-11 6 0 11 3 13 9h3c7 0 12 5 12 10s-5 11-12 11z" opacity="0.9" />
      </g>

      {/* холмы */}
      <path d="M0 300c60-40 130-50 200-30s140 10 200-20v150H0z" fill="#8FD6CC" />
      <path d="M0 330c80-30 160-30 240-10s120 10 160-5v85H0z" fill="#51BDB0" />

      {/* деревья */}
      <g>
        <rect x="52" y="262" width="8" height="40" rx="4" fill="#9B6B4E" />
        <circle cx="56" cy="252" r="26" fill="#3FA99C" />
        <circle cx="44" cy="262" r="16" fill="#51BDB0" />
        <rect x="340" y="268" width="8" height="36" rx="4" fill="#9B6B4E" />
        <circle cx="344" cy="258" r="22" fill="#3FA99C" />
      </g>

      {/* здание */}
      <g>
        <rect x="112" y="196" width="176" height="124" rx="14" fill="#FFF9EE" />
        <path d="M100 204L200 128l100 76z" fill="#FF8B78" />
        <path d="M100 204L200 128l100 76" fill="none" stroke="#E8664F" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="200" cy="172" r="14" fill="#FFCA55" />
        <circle cx="200" cy="172" r="6" fill="#FFF9EE" />

        {/* окна */}
        <g fill="#BFE8E2" stroke="#51BDB0" strokeWidth="4">
          <rect x="132" y="222" width="34" height="30" rx="10" />
          <rect x="234" y="222" width="34" height="30" rx="10" />
        </g>
        <g fill="#FFCA55">
          <circle cx="149" cy="282" r="12" />
          <circle cx="251" cy="282" r="12" />
        </g>

        {/* дверь */}
        <path d="M180 320v-50a20 20 0 0 1 40 0v50z" fill="#51BDB0" />
        <circle cx="210" cy="296" r="3" fill="#FFF9EE" />
      </g>

      {/* флажки */}
      <path d="M112 196c30 14 60 18 88 18s58-4 88-18" fill="none" stroke="#28434A" strokeOpacity="0.25" strokeWidth="2" />
      <g>
        <path d="M134 203l6 14 6-12z" fill="#FFCA55" />
        <path d="M164 210l6 14 6-12z" fill="#FF8B78" />
        <path d="M224 210l6 12 6-14z" fill="#A99BF0" />
        <path d="M254 203l6 12 6-14z" fill="#FFCA55" />
      </g>

      {/* шарики */}
      <g>
        <path d="M76 176q6 30 -2 64" fill="none" stroke="#28434A" strokeOpacity="0.35" strokeWidth="1.5" />
        <ellipse cx="76" cy="160" rx="15" ry="18" fill="#FF8B78" />
        <path d="M330 150q-4 30 4 60" fill="none" stroke="#28434A" strokeOpacity="0.35" strokeWidth="1.5" />
        <ellipse cx="330" cy="136" rx="13" ry="16" fill="#A99BF0" />
      </g>

      {/* цветы */}
      <g>
        {[
          [96, 334, "#FFCA55"],
          [128, 350, "#FF8B78"],
          [282, 346, "#FFCA55"],
          [312, 334, "#fff"],
        ].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="6" cx="0" cy="-6" fill={c as string} />
            <circle r="6" cx="6" cy="0" fill={c as string} />
            <circle r="6" cx="0" cy="6" fill={c as string} />
            <circle r="6" cx="-6" cy="0" fill={c as string} />
            <circle r="4" fill="#E8664F" />
          </g>
        ))}
      </g>
    </svg>
  );
}
