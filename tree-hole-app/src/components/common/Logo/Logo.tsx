import React from 'react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      <svg
        width="80"
        height="64"
        viewBox="0 0 120 120"
        className="logo-illustration"
      >
        <defs>
          <linearGradient id="carrotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FF6B00" />
          </linearGradient>

          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text
          x="60"
          y="18"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="url(#carrotGradient)"
          fontFamily="'PingFang SC', 'Microsoft YaHei', sans-serif"
        >
          树洞红包
        </text>

        <g transform="translate(20, 25)" filter="url(#glow)">
          <ellipse
            cx="40"
            cy="55"
            rx="6"
            ry="4"
            fill="#FFD700"
            opacity="0.6"
          />

          <path
            d="M40 85 Q35 70 25 55 L28 50 L32 55 Q37 68 40 85"
            fill="url(#carrotGradient)"
          />

          <path
            d="M40 85 Q45 70 55 55 L52 50 L48 55 Q43 68 40 85"
            fill="url(#carrotGradient)"
          />

          <ellipse
            cx="40"
            cy="70"
            rx="4"
            ry="8"
            fill="#FF7B00"
            opacity="0.4"
          />

          <path
            d="M35 38 Q37 25 40 20 Q43 25 45 38"
            fill="url(#leafGradient)"
          />

          <path
            d="M40 38 Q38 22 40 15 Q42 22 40 38"
            fill="url(#leafGradient)"
          />

          <path
            d="M45 38 Q47 25 50 20 Q53 25 45 38"
            fill="url(#leafGradient)"
          />

          <circle cx="36" cy="50" r="2" fill="#4ADE80" opacity="0.8" />
          <circle cx="44" cy="55" r="1.5" fill="#4ADE80" opacity="0.8" />
          <circle cx="40" cy="62" r="1.5" fill="#4ADE80" opacity="0.8" />
        </g>

        <style>{`
          .logo-illustration {
            filter: drop-shadow(0 2px 8px rgba(255, 140, 0, 0.3));
            transition: transform 0.3s ease;
          }

          .logo-illustration:hover {
            transform: scale(1.08);
          }
        `}</style>
      </svg>
    </div>
  );
}
