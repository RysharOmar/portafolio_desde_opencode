import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}

export function Marquee({ items, speed = 40, direction = 'left' }: MarqueeProps) {
  // Repeat items to ensure seamless loop
  const content = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-foreground/10 py-3 bg-background flex select-none">
      <div 
        className={`flex whitespace-nowrap min-w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {content.map((item, i) => (
          <React.Fragment key={i}>
            <span className="text-sm font-sans tracking-widest uppercase text-muted-foreground mx-4">
              {item}
            </span>
            <span className="text-muted-foreground/40 mx-4">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
