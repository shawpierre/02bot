import React, { useState, useCallback } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
}

interface Firefly {
  id: number;
  left: string;
  top: string;
  delay: string;
}

export function FireflyBackground() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [fireworkId, setFireworkId] = useState(0);

  // 生成初始萤火虫位置
  const fireflies: Firefly[] = [
    { id: 1, left: '10%', top: '20%', delay: '0s' },
    { id: 2, left: '85%', top: '15%', delay: '1s' },
    { id: 3, left: '20%', top: '70%', delay: '2s' },
    { id: 4, left: '75%', top: '60%', delay: '3s' },
    { id: 5, left: '45%', top: '30%', delay: '1.5s' },
    { id: 6, left: '60%', top: '80%', delay: '2.5s' },
    { id: 7, left: '30%', top: '45%', delay: '0.5s' },
    { id: 8, left: '90%', top: '40%', delay: '3.5s' },
    { id: 9, left: '15%', top: '85%', delay: '4s' },
    { id: 10, left: '70%', top: '25%', delay: '4.5s' },
    { id: 11, left: '50%', top: '55%', delay: '2s' },
    { id: 12, left: '82%', top: '75%', delay: '3.2s' },
  ];

  const handleFireflyClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const newFirework: Firework = {
      id: fireworkId,
      x,
      y,
    };

    setFireworks((prev) => [...prev, newFirework]);
    setFireworkId((prev) => prev + 1);

    // 1.5秒后移除烟火效果
    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 1500);
  }, [fireworkId]);

  return (
    <>
      {/* 夜晚森林背景 */}
      <div className="firefly-background">
        {/* 渐变背景 - 深邃夜空 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929] via-[#0f2235] to-[#0a1520]"></div>
        
        {/* 星空效果 */}
        <div className="absolute inset-0 opacity-40">
          <div className="star" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
          <div className="star" style={{ top: '15%', left: '70%', animationDelay: '1s' }}></div>
          <div className="star" style={{ top: '25%', left: '40%', animationDelay: '2s' }}></div>
          <div className="star" style={{ top: '30%', left: '85%', animationDelay: '1.5s' }}></div>
          <div className="star" style={{ top: '35%', left: '15%', animationDelay: '3s' }}></div>
          <div className="star" style={{ top: '40%', left: '60%', animationDelay: '2.5s' }}></div>
          <div className="star small" style={{ top: '12%', left: '50%', animationDelay: '0.5s' }}></div>
          <div className="star small" style={{ top: '22%', left: '80%', animationDelay: '1.8s' }}></div>
          <div className="star small" style={{ top: '38%', left: '25%', animationDelay: '2.8s' }}></div>
        </div>

        {/* 月亮 */}
        <div className="moon-container">
          <div className="moon"></div>
          <div className="moon-glow"></div>
          {/* 月光光束 */}
          <div className="moonbeam"></div>
        </div>

        {/* 薄雾层 */}
        <div className="absolute inset-0 opacity-20">
          <div className="mist mist-1"></div>
          <div className="mist mist-2"></div>
          <div className="mist mist-3"></div>
        </div>
        
        {/* 森林剪影层 - 多层次 */}
        <div className="absolute inset-0 opacity-50">
          <svg
            className="absolute bottom-0 w-full h-80"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 最远处的山峦 */}
            <path
              d="M0,400 L0,250 Q200,200 400,250 Q600,200 800,250 Q1000,220 1200,260 L1200,400 Z"
              fill="#0B1821"
              opacity="0.6"
            />
            
            {/* 远处的树林 - 第一排 */}
            <path
              d="M0,400 L0,220 Q50,200 80,220 Q100,180 120,220 Q150,160 180,220 Q220,180 250,220 Q280,150 320,220 Q360,180 400,220 Q450,160 500,220 Q540,190 600,220 Q650,170 700,220 Q740,190 800,220 Q850,170 900,220 Q940,190 1000,220 Q1050,180 1100,220 Q1150,200 1200,220 L1200,400 Z"
              fill="#0D2818"
              opacity="0.8"
            />
            
            {/* 中景树林 - 第二排 */}
            <path
              d="M0,400 L0,260 Q40,240 70,270 Q100,230 140,270 Q180,240 220,280 Q270,220 320,280 Q360,250 420,280 Q480,230 540,280 Q590,250 650,280 Q710,240 770,280 Q820,250 880,280 Q930,240 980,280 Q1030,260 1080,280 Q1130,250 1200,280 L1200,400 Z"
              fill="#0F3520"
              opacity="0.9"
            />
            
            {/* 近景树林 - 第三排，更具体的树形 */}
            <g fill="#0A1F14">
              {/* 单独的树 */}
              <path d="M50,400 L50,320 Q55,315 60,320 L60,400 Z" />
              <ellipse cx="55" cy="310" rx="25" ry="30" opacity="0.95" />
              
              <path d="M200,400 L200,300 Q207,295 214,300 L214,400 Z" />
              <ellipse cx="207" cy="285" rx="32" ry="38" opacity="0.95" />
              
              <path d="M400,400 L400,310 Q406,305 412,310 L412,400 Z" />
              <ellipse cx="406" cy="295" rx="28" ry="35" opacity="0.95" />
              
              <path d="M600,400 L600,315 Q606,310 612,315 L612,400 Z" />
              <ellipse cx="606" cy="300" rx="30" ry="36" opacity="0.95" />
              
              <path d="M800,400 L800,305 Q807,300 814,305 L814,400 Z" />
              <ellipse cx="807" cy="290" rx="33" ry="40" opacity="0.95" />
              
              <path d="M950,400 L950,320 Q956,315 962,320 L962,400 Z" />
              <ellipse cx="956" cy="305" rx="27" ry="33" opacity="0.95" />
              
              <path d="M1100,400 L1100,310 Q1107,305 1114,310 L1114,400 Z" />
              <ellipse cx="1107" cy="295" rx="29" ry="36" opacity="0.95" />
            </g>
            
            {/* 地面层 */}
            <path
              d="M0,400 L0,350 Q200,345 400,355 Q600,350 800,360 Q1000,355 1200,365 L1200,400 Z"
              fill="#081410"
            />
          </svg>
        </div>

        {/* 灌木丛点缀 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-40">
          <div className="bush" style={{ left: '5%', bottom: '0' }}></div>
          <div className="bush" style={{ left: '15%', bottom: '0' }}></div>
          <div className="bush" style={{ left: '35%', bottom: '0' }}></div>
          <div className="bush" style={{ left: '55%', bottom: '0' }}></div>
          <div className="bush" style={{ left: '72%', bottom: '0' }}></div>
          <div className="bush" style={{ left: '88%', bottom: '0' }}></div>
        </div>

        {/* 萤火虫 */}
        {fireflies.map((firefly) => (
          <div
            key={firefly.id}
            className="firefly-container"
            style={{
              left: firefly.left,
              top: firefly.top,
              animationDelay: firefly.delay,
            }}
            onClick={handleFireflyClick}
          >
            <div className="firefly-dot"></div>
            <div className="firefly-glow"></div>
          </div>
        ))}
      </div>

      {/* 烟火效果 */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="firework-container"
          style={{
            left: `${firework.x}px`,
            top: `${firework.y}px`,
          }}
        >
          {/* 生成多个粒子 */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="firework-particle"
              style={{
                '--angle': `${(i * 360) / 12}deg`,
                '--hue': `${Math.random() * 60 + 30}`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
      ))}

      <style>{`
        .firefly-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* 星星 */
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
          animation: twinkle 3s ease-in-out infinite;
        }

        .star.small {
          width: 1px;
          height: 1px;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* 月亮 */
        .moon-container {
          position: absolute;
          top: 8%;
          right: 12%;
          z-index: 2;
        }

        .moon {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at 35% 35%, #FFFEF0 0%, #F5F3E0 40%, #E8E6D0 100%);
          border-radius: 50%;
          box-shadow: 
            0 0 30px rgba(255, 254, 240, 0.6),
            0 0 60px rgba(255, 254, 240, 0.4),
            inset -8px -8px 15px rgba(0, 0, 0, 0.1);
          position: relative;
          animation: moon-glow-pulse 8s ease-in-out infinite;
        }

        /* 月球表面细节 */
        .moon::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 50%;
          top: 30%;
          left: 45%;
        }

        .moon::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(0, 0, 0, 0.06);
          border-radius: 50%;
          top: 55%;
          left: 35%;
        }

        .moon-glow {
          position: absolute;
          top: -30px;
          left: -30px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255, 254, 240, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: moon-glow-pulse 8s ease-in-out infinite;
        }

        @keyframes moon-glow-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        /* 月光光束 */
        .moonbeam {
          position: absolute;
          top: 80px;
          left: 20px;
          width: 120px;
          height: 400px;
          background: linear-gradient(180deg, 
            rgba(255, 254, 240, 0.15) 0%,
            rgba(255, 254, 240, 0.08) 30%,
            rgba(255, 254, 240, 0.03) 60%,
            transparent 100%
          );
          clip-path: polygon(40% 0%, 60% 0%, 70% 100%, 30% 100%);
          opacity: 0.5;
          animation: moonbeam-sway 10s ease-in-out infinite;
        }

        @keyframes moonbeam-sway {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(-10px) rotate(-2deg);
          }
        }

        /* 薄雾 */
        .mist {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 40%;
          background: radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          animation: mist-float 20s ease-in-out infinite;
        }

        .mist-1 {
          animation-delay: 0s;
          opacity: 0.6;
        }

        .mist-2 {
          animation-delay: 7s;
          opacity: 0.4;
        }

        .mist-3 {
          animation-delay: 14s;
          opacity: 0.5;
        }

        @keyframes mist-float {
          0%, 100% {
            transform: translateX(-5%) scale(1);
          }
          50% {
            transform: translateX(5%) scale(1.05);
          }
        }

        /* 灌木丛 */
        .bush {
          position: absolute;
          width: 60px;
          height: 30px;
          background: radial-gradient(ellipse at bottom, #0A1F14 0%, transparent 70%);
          border-radius: 50% 50% 0 0;
          opacity: 0.8;
        }

        /* 萤火虫 */
        .firefly-container {
          position: absolute;
          width: 8px;
          height: 8px;
          pointer-events: auto;
          cursor: pointer;
          animation: float-firefly 6s ease-in-out infinite;
          z-index: 5;
        }

        .firefly-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #FFE066 0%, #FFD700 50%, transparent 70%);
          border-radius: 50%;
          animation: pulse-firefly 2s ease-in-out infinite;
        }

        .firefly-glow {
          position: absolute;
          width: 20px;
          height: 20px;
          top: -6px;
          left: -6px;
          background: radial-gradient(circle, rgba(255, 224, 102, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-glow-firefly 2s ease-in-out infinite;
        }

        @keyframes float-firefly {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -20px);
          }
          50% {
            transform: translate(-20px, 15px);
          }
          75% {
            transform: translate(15px, -30px);
          }
        }

        @keyframes pulse-firefly {
          0%, 100% {
            opacity: 0.6;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes pulse-glow-firefly {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
        }

        /* 烟火效果 */
        .firework-container {
          position: fixed;
          width: 0;
          height: 0;
          z-index: 100;
          pointer-events: none;
        }

        .firework-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, 
            hsl(var(--hue), 100%, 70%) 0%, 
            hsl(var(--hue), 100%, 50%) 50%, 
            transparent 100%
          );
          border-radius: 50%;
          animation: explode-particle 1.5s ease-out forwards;
          transform: rotate(var(--angle)) translateX(0);
        }

        @keyframes explode-particle {
          0% {
            transform: rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle)) translateX(120px) scale(0);
            opacity: 0;
          }
        }

        /* 额外的闪光效果 */
        .firework-container::before {
          content: '';
          position: absolute;
          width: 60px;
          height: 60px;
          top: -30px;
          left: -30px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: flash-firework 0.5s ease-out;
        }

        @keyframes flash-firework {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
