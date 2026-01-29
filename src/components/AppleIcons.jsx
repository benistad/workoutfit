// Apple Fitness-style SVG icons

export function FlameIcon({ size = 24, color = 'var(--apple-red)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2C12 2 8.5 6 8.5 10C8.5 12.21 10.29 14 12.5 14C14.71 14 16.5 12.21 16.5 10C16.5 6 12 2 12 2Z" 
        fill={color}
        opacity="0.3"
      />
      <path 
        d="M12 23C7.03 23 3 18.97 3 14C3 10.13 5.5 6.5 8 4C8 7.5 10 10 12 10C14 10 16 7.5 16 4C18.5 6.5 21 10.13 21 14C21 18.97 16.97 23 12 23Z" 
        fill={color}
      />
      <path 
        d="M12 23C9.79 23 8 21.21 8 19C8 16.5 10 14 12 14C14 14 16 16.5 16 19C16 21.21 14.21 23 12 23Z" 
        fill="#FF9500"
      />
    </svg>
  );
}

export function TimerIcon({ size = 24, color = 'var(--apple-green)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="12" 
        cy="13" 
        r="8" 
        stroke={color} 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M12 9V13L15 15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 2H15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M12 2V4" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M18.5 6.5L19.5 5.5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ListIcon({ size = 24, color = 'var(--apple-blue)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="4" 
        y="3" 
        width="16" 
        height="18" 
        rx="2" 
        stroke={color} 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M8 8H16" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M8 12H16" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M8 16H12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StreakIcon({ size = 24, color = 'var(--apple-orange)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M13 2L4 14H11L10 22L20 10H13L13 2Z" 
        fill={color}
      />
    </svg>
  );
}

export function CalendarIcon({ size = 24, color = 'var(--apple-text-primary)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="3" 
        y="4" 
        width="18" 
        height="18" 
        rx="2" 
        stroke={color} 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M3 10H21" 
        stroke={color} 
        strokeWidth="2"
      />
      <path 
        d="M8 2V6" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M16 2V6" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="2" fill={color} />
    </svg>
  );
}

export function ClockIcon({ size = 24, color = 'var(--apple-text-primary)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke={color} 
        strokeWidth="2"
        fill="none"
      />
      <path 
        d="M12 7V12L15 14" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckCircleIcon({ size = 24, color = 'var(--apple-green)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        fill={color}
      />
      <path 
        d="M8 12L11 15L16 9" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
