import React from 'react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
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

          <filter id="glow" x="-50%" y1="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(50, 50)" filter="url(#glow)">
          <ellipse
            cx="0"
            cy="38"
            rx="5"
            ry="3"
            fill="#FFD700"
            opacity="0.5"
          />

          <path
            d="M0 38 Q-6 20 -16 8 L-12 4 L-8 10 Q-4 22 0 38"
            fill="url(#carrotGradient)"
          />

          <path
            d="M0 38 Q6 20 16 8 L12 4 L8 10 Q4 22 0 38"
            fill="url(#carrotGradient)"
          />

          <ellipse
            cx="0"
            cy="25"
            rx="3"
            ry="6"
            fill="#FF7B00"
            opacity="0.35"
          />

          <path
            d="M-5 -2 Q-3 -18 0 -28 Q3 -18 5 -2"
            fill="url(#leafGradient)"
          />

          <path
            d="M0 -2 Q-2 -20 0 -32 Q2 -20 0 -2"
            fill="url(#leafGradient)"
          />

          <path
            d="M5 -2 Q7 -18 10 -26 Q13 -18 5 -2"
            fill="url(#leafGradient)"
          />

          <circle cx="-4" cy="8" r="1.5" fill="#4ADE80" opacity="0.7" />
          <circle cx="4" cy="12" r="1" fill="#4ADE80" opacity="0.7" />
          <circle cx="0" cy="20" r="1" fill="#4ADE80" opacity="0.7" />
        </g>

        <style>{`
          .logo-illustration {
            filter: drop-shadow(0 2px 10px rgba(255, 140, 0, 0.4));
            transition: transform 0.3s ease;
          }

          .logo-illustration:hover {
            transform: scale(1.1) rotate(-5deg);
          }
        `}</style>
      </svg>
    </div>
  );
}
