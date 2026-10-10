import React from 'react';

export function SynapseSentinelIcon({
  size = 40,
  color = '#AA5022',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 105"
      width={size}
      height={Math.round(size * 1.05)}
      className={className}
      aria-label="Synapse Sentinel"
      fill="none"
    >
      {/* ── CENTER DIVIDER ── */}
      <line
        x1="50" y1="6" x2="50" y2="99"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"
      />

      {/* ── RIGHT HALF: Shield outline (half-shield, right side only) ── */}
      <path
        d="M50,6 Q67,4 80,16 Q92,28 90,52 Q88,72 74,86 Q64,96 50,100"
        stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
      />

      {/*
        ── RIGHT HALF: Circuit ──
        Vertical trunk from which 3 horizontal branches extend right.
        Each branch ends in a filled circle.
        A short horizontal connector leads from the center line to the trunk.
      */}
      {/* Connector: center → trunk */}
      <line
        x1="50" y1="52" x2="60" y2="52"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"
      />
      {/* Vertical trunk */}
      <line
        x1="60" y1="34" x2="60" y2="70"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"
      />
      {/* Top branch */}
      <line
        x1="60" y1="34" x2="80" y2="34"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"
      />
      <circle cx="84" cy="34" r="4" fill={color} />
      {/* Middle branch (longest) */}
      <line
        x1="60" y1="52" x2="82" y2="52"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"
      />
      <circle cx="86" cy="52" r="4" fill={color} />
      {/* Bottom branch */}
      <line
        x1="60" y1="70" x2="80" y2="70"
        stroke={color} strokeWidth="2.8" strokeLinecap="round"
      />
      <circle cx="84" cy="70" r="4" fill={color} />

      {/*
        ── LEFT HALF: Brain ──
        Organic, cloud-like silhouette with two round upper lobes
        and two smaller lower lobes. Extends significantly left of
        the shield edge. Includes a horizontal fold line in the middle.
      */}
      {/* Main outer path — two top lobes + bottom lobes */}
      <path
        d="
          M 50,16
          C 46,8 38,4 30,6
          C 22,6 16,10 14,18
          C 6,18 2,26 4,36
          C 0,44 4,56 12,60
          C 8,70 14,82 26,86
          C 36,90 46,84 50,74
        "
        stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Indentation between the two upper lobes */}
      <path
        d="M 28,8 Q 34,16 42,12"
        stroke={color} strokeWidth="2.2" strokeLinecap="round"
      />

      {/* Horizontal middle fold (classic brain crease) */}
      <path
        d="M 6,46 Q 18,40 32,46 Q 40,49 48,46"
        stroke={color} strokeWidth="2.2" strokeLinecap="round"
      />

      {/* Bottom lobe indentation */}
      <path
        d="M 18,84 Q 28,76 38,80"
        stroke={color} strokeWidth="2.2" strokeLinecap="round"
      />
    </svg>
  );
}
