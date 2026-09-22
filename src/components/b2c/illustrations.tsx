// Линейные иллюстрации изделий для страниц частных заказчиков.
// Рисуются цветом currentColor, размер задаётся классом снаружи.

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 120 80",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function CarportIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 26 60 10l52 16" />
      <path d="M8 26h104" />
      <path d="M16 26v44M104 26v44" />
      <path d="M16 70h-6M104 70h6" />
      <path d="M32 66h48" />
      <path d="M36 66v-8a6 6 0 0 1 3-5l8-4h20l8 4a6 6 0 0 1 3 5v8" />
      <circle cx="44" cy="66" r="4" />
      <circle cx="72" cy="66" r="4" />
    </svg>
  );
}

export function GateIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 66h100" />
      <path d="M18 66V22h84v44" />
      <path d="M60 22v44" />
      <path d="M32 30v28M46 30v28M74 30v28M88 30v28" />
      <path d="M18 22h84" />
      <path d="M14 70h92" />
      <circle cx="56" cy="46" r="2.5" />
    </svg>
  );
}

export function StairsIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 70h28v-12h22V46h22V34h24" />
      <path d="M12 70V58" />
      <path d="M18 54 104 16" />
      <path d="M22 56v-6M46 46v-8M70 36v-8M94 26v-8" />
      <path d="M40 58v12M62 46v12M84 34v12" />
    </svg>
  );
}

export function RailingIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 68h104" />
      <path d="M12 20h96" />
      <path d="M12 20v48M108 20v48" />
      <path d="M12 32h96M12 56h96" />
      <path d="M36 20v48M60 20v48M84 20v48" />
    </svg>
  );
}

export function CanopyIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18 4v72" />
      <path d="M10 76h98" />
      <path d="M24 36h26v40H24z" />
      <circle cx="44" cy="58" r="2" />
      <path d="M18 22 100 34v7L18 29z" />
      <path d="M18 48 62 34" />
    </svg>
  );
}

export function GrillIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M22 36h62v24H22z" />
      <path d="M22 44h62" />
      <path d="M30 60v12M76 60v12" />
      <path d="M84 36h14v-18h-8" />
      <path d="M90 18c0-4 4-5 4-9" />
      <path d="M36 30c0-5 6-6 6-11M50 30c0-5 6-6 6-11M64 30c0-5 6-6 6-11" />
    </svg>
  );
}

export function StirrupIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M34 18h56v44H30V22" />
      <path d="M34 18 48 32" />
      <path d="M30 22 44 36" />
    </svg>
  );
}

export function RingIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="60" cy="40" r="27" />
      <circle cx="60" cy="40" r="16" />
      <path d="M60 13v6M60 61v6" opacity="0.45" />
    </svg>
  );
}

export function BendIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 62h38l36-36" />
      <path d="M88 26h16" />
      <path d="M52 62a36 36 0 0 1 10-25" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="52" cy="62" r="3" />
      <path d="M14 70h96" opacity="0.35" />
    </svg>
  );
}

export function ThreadIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 32h96v16H12z" />
      <path d="M64 32v16M72 32v16M80 32v16M88 32v16M96 32v16" />
      <path d="M12 28v24" opacity="0.4" />
    </svg>
  );
}

export function PlateIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 22h72v18H24z" />
      <path d="M36 40v26M60 40v26M84 40v26" />
      <path d="M36 66h-8M60 66h-8M84 66h-8" />
      <path d="M24 31h72" opacity="0.4" />
    </svg>
  );
}

export function CustomPartIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M24 16h18v38h54v14H24z" />
      <circle cx="33" cy="27" r="3" />
      <circle cx="33" cy="43" r="3" />
      <circle cx="68" cy="61" r="3" />
      <circle cx="84" cy="61" r="3" />
    </svg>
  );
}

export function CuttingIllustration({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 52h96" />
      <path d="M12 52v10h96V52" opacity="0.4" />
      <path d="M60 12v22" />
      <path d="M54 34h12l-6 10z" />
      <path d="M48 58l-8 8M60 60l-2 12M72 58l8 8" opacity="0.7" />
    </svg>
  );
}
