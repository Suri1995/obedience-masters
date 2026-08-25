export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="20" fill={dark ? "#000000" : "#FFB500"} />
        <path
          d="M13 24.5c0-3.5 3-8 7-8s7 4.5 7 8-2.8 4.7-7 4.7-7-1.2-7-4.7Z"
          fill={dark ? "#FFB500" : "#000000"}
        />
        <circle cx="14.5" cy="14" r="2.3" fill={dark ? "#FFB500" : "#000000"} />
        <circle cx="25.5" cy="14" r="2.3" fill={dark ? "#FFB500" : "#000000"} />
        <circle cx="10.5" cy="19" r="2" fill={dark ? "#FFB500" : "#000000"} />
        <circle cx="29.5" cy="19" r="2" fill={dark ? "#FFB500" : "#000000"} />
      </svg>
      <span className="font-display text-lg font-extrabold leading-tight tracking-tight">
        Obedience
        <br />
        Masters
      </span>
    </div>
  );
}
