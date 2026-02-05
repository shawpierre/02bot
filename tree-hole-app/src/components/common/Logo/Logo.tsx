import React from 'react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      {/* SVG 插画：写实风格的小女孩向大树诉说秘密 */}
      <svg 
        width="80" 
        height="64" 
        viewBox="0 0 200 160" 
        className="logo-illustration"
      >
        <defs>
          {/* 渐变定义 */}
          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A5F4D" />
            <stop offset="100%" stopColor="#2C3A2E" />
          </linearGradient>
          
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5A8F5E" />
            <stop offset="50%" stopColor="#3D6B41" />
            <stop offset="100%" stopColor="#2D5230" />
          </linearGradient>
          
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDDB0" />
            <stop offset="100%" stopColor="#FFCB91" />
          </linearGradient>
          
          <linearGradient id="dressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#C9184A" />
          </linearGradient>
          
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0.4" />
          </linearGradient>

          <radialGradient id="holeGlow">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
          </radialGradient>

          {/* 滤镜 */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 背景树木剪影（增加森林感） */}
        <g opacity="0.15">
          <ellipse cx="30" cy="60" rx="15" ry="25" fill="#1a3a1a" />
          <rect x="25" y="60" width="10" height="35" fill="#0d1f0d" />
          <ellipse cx="170" cy="70" rx="12" ry="20" fill="#1a3a1a" />
          <rect x="166" y="70" width="8" height="30" fill="#0d1f0d" />
        </g>

        {/* 主树 - 更写实的风格 */}
        <g id="mainTree" filter="url(#softShadow)">
          {/* 树干基座 */}
          <path 
            d="M115 95 Q120 100 125 95 L130 155 Q125 158 120 155 Z" 
            fill="url(#treeGradient)"
          />
          {/* 树干纹理 */}
          <path 
            d="M118 100 Q118 105 118 110" 
            stroke="#3A4A3D" 
            strokeWidth="1" 
            opacity="0.5"
            fill="none"
          />
          <path 
            d="M127 115 Q127 120 127 125" 
            stroke="#3A4A3D" 
            strokeWidth="1" 
            opacity="0.5"
            fill="none"
          />
          
          {/* 树洞 - 更立体 */}
          <ellipse 
            cx="123" 
            cy="115" 
            rx="12" 
            ry="16" 
            fill="#1A1A1A"
          />
          <ellipse 
            cx="123" 
            cy="115" 
            rx="10" 
            ry="14" 
            fill="#0D0D0D"
          />
          {/* 树洞光晕 */}
          <ellipse 
            cx="123" 
            cy="115" 
            rx="18" 
            ry="22" 
            fill="url(#holeGlow)"
            className="tree-hole-glow"
          />
          
          {/* 树冠 - 多层次 */}
          <ellipse cx="123" cy="80" rx="35" ry="40" fill="url(#leafGradient)" opacity="0.9" />
          <ellipse cx="110" cy="70" rx="28" ry="32" fill="#4A7D4E" opacity="0.85" />
          <ellipse cx="136" cy="70" rx="28" ry="32" fill="#4A7D4E" opacity="0.85" />
          <ellipse cx="115" cy="55" rx="22" ry="26" fill="#5A8F5E" opacity="0.8" />
          <ellipse cx="131" cy="55" rx="22" ry="26" fill="#5A8F5E" opacity="0.8" />
          <ellipse cx="123" cy="45" rx="18" ry="22" fill="#6AA06E" opacity="0.75" />
          
          {/* 树叶细节 */}
          <circle cx="105" cy="65" r="8" fill="#3D6B41" opacity="0.6" />
          <circle cx="141" cy="68" r="7" fill="#3D6B41" opacity="0.6" />
          <circle cx="120" cy="50" r="6" fill="#5A8F5E" opacity="0.7" />
          <circle cx="128" cy="48" r="5" fill="#5A8F5E" opacity="0.7" />
        </g>

        {/* 小女孩 - 更写实细节 */}
        <g id="girl" filter="url(#softShadow)">
          {/* 裙子 */}
          <path 
            d="M55 115 L50 145 Q55 148 60 145 L65 145 Q70 148 75 145 L70 115 Q62.5 118 55 115 Z" 
            fill="url(#dressGradient)"
          />
          {/* 裙子装饰 */}
          <circle cx="60" cy="130" r="2" fill="#FFB3D9" opacity="0.6" />
          <circle cx="65" cy="135" r="2" fill="#FFB3D9" opacity="0.6" />
          
          {/* 身体 */}
          <ellipse cx="62.5" cy="105" rx="14" ry="18" fill="url(#dressGradient)" />
          
          {/* 手臂 - 伸向树 */}
          <path 
            d="M73 100 Q95 95 110 108" 
            stroke="url(#skinGradient)" 
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
          />
          {/* 手掌 */}
          <ellipse cx="109" cy="109" rx="5" ry="6" fill="url(#skinGradient)" transform="rotate(-20 109 109)" />
          
          {/* 另一只手臂 */}
          <path 
            d="M52 100 Q45 105 48 112" 
            stroke="url(#skinGradient)" 
            strokeWidth="5" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* 脖子 */}
          <rect x="58" y="88" width="9" height="8" fill="url(#skinGradient)" rx="2" />
          
          {/* 头部 */}
          <ellipse cx="62.5" cy="75" rx="16" ry="18" fill="url(#skinGradient)" />
          
          {/* 耳朵 */}
          <ellipse cx="48" cy="75" rx="3" ry="4" fill="#FFCB91" />
          <ellipse cx="77" cy="75" rx="3" ry="4" fill="#FFCB91" />
          
          {/* 头发 - 更自然的形状 */}
          <path 
            d="M48 65 Q42 60 42 70 Q42 62 48 58 Q55 54 62.5 54 Q70 54 77 58 Q83 62 83 70 Q83 60 77 65 Q75 68 72 70 L70 72 Q66 68 62.5 68 Q59 68 55 72 L53 70 Z" 
            fill="#3E2723"
          />
          {/* 刘海 */}
          <ellipse cx="56" cy="62" rx="8" ry="6" fill="#3E2723" />
          <ellipse cx="69" cy="62" rx="8" ry="6" fill="#3E2723" />
          
          {/* 眉毛 */}
          <path d="M53 72 Q56 71 59 72" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M66 72 Q69 71 72 72" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* 眼睛 - 更有神 */}
          <ellipse cx="56" cy="76" rx="2.5" ry="3" fill="#2C1810" />
          <ellipse cx="69" cy="76" rx="2.5" ry="3" fill="#2C1810" />
          <circle cx="57" cy="75" r="1" fill="#FFFFFF" opacity="0.8" />
          <circle cx="70" cy="75" r="1" fill="#FFFFFF" opacity="0.8" />
          
          {/* 鼻子 */}
          <circle cx="62.5" cy="80" r="1" fill="#FFBB99" opacity="0.5" />
          
          {/* 微笑 */}
          <path 
            d="M55 83 Q62.5 87 70 83" 
            stroke="#2C1810" 
            strokeWidth="1.5" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* 腮红 */}
          <ellipse cx="50" cy="79" rx="4" ry="3" fill="#FFB3C1" opacity="0.4" />
          <ellipse cx="75" cy="79" rx="4" ry="3" fill="#FFB3C1" opacity="0.4" />
        </g>

        {/* 魔法秘密流动效果 */}
        <g id="secretFlow" className="secret-flow">
          <path 
            d="M110 108 Q115 105 118 110" 
            stroke="url(#glowGradient)" 
            strokeWidth="3" 
            fill="none"
            strokeDasharray="4,4"
            strokeLinecap="round"
          />
          <circle cx="112" cy="107" r="3" fill="#2DD4BF" opacity="0.8">
            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="116" cy="105" r="2" fill="#14B8A6" opacity="0.7">
            <animate attributeName="r" values="2;3;2" dur="2s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="119" cy="108" r="1.5" fill="#0D9488" opacity="0.6">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* 标题文字 */}
        <defs>
          <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
        
        <text 
          x="8" 
          y="30" 
          fontSize="22" 
          fontWeight="900" 
          fill="url(#titleGradient)"
          fontFamily="'PingFang SC', 'Microsoft YaHei', sans-serif"
          letterSpacing="2"
        >
          树洞红包
        </text>
      </svg>

      <style>{`
        .logo-illustration {
          filter: drop-shadow(0 2px 12px rgba(45, 212, 191, 0.25));
          transition: transform 0.3s ease;
        }

        .logo-illustration:hover {
          transform: scale(1.05);
        }

        .tree-hole-glow {
          animation: pulse-hole-glow 3s ease-in-out infinite;
        }

        @keyframes pulse-hole-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .secret-flow {
          animation: float-secret 3s ease-in-out infinite;
        }

        @keyframes float-secret {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
}
