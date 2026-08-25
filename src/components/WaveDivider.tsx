type WaveDividerProps = {
  color: string;
  position?: "top" | "bottom";
  className?: string;
};

/**
 * A soft, hand-torn "paper wave" edge — echoes the scalloped
 * dividers used throughout the approved comps.
 */
export function WaveDivider({ color, position = "top", className = "" }: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none absolute left-0 w-full overflow-hidden leading-[0] ${
        position === "top" ? "top-0 -translate-y-[99%]" : "bottom-0 translate-y-[99%]"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-[48px] w-full md:h-[70px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C60,80 120,0 180,40 C240,80 300,0 360,40 C420,80 480,0 540,40 C600,80 660,0 720,40 C780,80 840,0 900,40 C960,80 1020,0 1080,40 C1140,80 1200,0 1260,40 C1320,80 1380,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
