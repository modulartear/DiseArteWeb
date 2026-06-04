/* DiseArte — NeonLogo (recreated in SVG, animatable) */
(function () {
  let _uid = 0;

  function NeonLogo({ variant = "full", className = "", style = {}, draw = false, idleFlicker = false }) {
    const id = React.useMemo(() => "nl" + (++_uid), []);
    const fCyan = `${id}-gc`;
    const fAmber = `${id}-ga`;
    const isFull = variant === "full";
    const vb = isFull ? "0 0 800 200" : "0 0 200 200";

    // stroke-dash setup for draw-on
    const dash = draw ? { strokeDasharray: 900, strokeDashoffset: 900 } : {};

    return (
      <svg
        className={`neon-logo ${draw ? "draw" : ""} ${idleFlicker ? "flick" : ""} ${className}`}
        viewBox={vb}
        style={style}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={fCyan} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b1" />
            <feGaussianBlur stdDeviation="7" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={fAmber} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b1" />
            <feGaussianBlur stdDeviation="6.5" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Emblem ===== */}
        <g
          stroke="#27e3ff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${fCyan})`}
          className="emblem-cyan"
        >
          {/* corner-bracket frame */}
          <path d="M24,66 L24,24 L66,24" style={dash} />
          <path d="M134,24 L176,24 L176,66" style={dash} />
          <path d="M176,134 L176,176 L134,176" style={dash} />
          <path d="M66,176 L24,176 L24,134" style={dash} />
          {/* isometric cube */}
          <path d="M100,40 L152,70 L152,130 L100,160 L48,130 L48,70 Z" style={dash} />
          <path d="M100,100 L100,40" style={dash} />
          <path d="M100,100 L48,130" style={dash} />
          <path d="M100,100 L152,130" style={dash} />
        </g>

        {/* flames */}
        <g
          stroke="#ff8a1f"
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#${fAmber})`}
          opacity="0.95"
          className="emblem-flame"
        >
          <path d="M86,156 C76,122 112,116 94,84 C82,62 106,54 98,36" style={dash} />
          <path d="M120,158 C130,126 98,118 118,90 C128,68 110,60 122,48" style={dash} />
          <path d="M104,150 C112,128 92,120 108,98" style={dash} />
        </g>

        {/* ===== Wordmark ===== */}
        {isFull && (
          <g className="wordmark">
            <text
              x="232"
              y="138"
              fontFamily="'Sora', sans-serif"
              fontSize="104"
              fontWeight="800"
              letterSpacing="2"
            >
              <tspan
                fill="none"
                stroke="#dbe5ec"
                strokeWidth="2.4"
                filter={`url(#${fCyan})`}
                style={{ paintOrder: "stroke" }}
              >
                DISE
              </tspan>
              <tspan
                fill="#ff8a1f"
                stroke="#ff8a1f"
                strokeWidth="0.6"
                filter={`url(#${fAmber})`}
              >
                ARTE
              </tspan>
            </text>
          </g>
        )}
      </svg>
    );
  }

  window.NeonLogo = NeonLogo;
})();
