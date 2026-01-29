export function ActivityRings({ 
  move = 0, 
  exercise = 0, 
  stand = 0,
  size = 140,
  strokeWidth = 12 
}) {
  const rings = [
    { color: 'var(--apple-red)', progress: move, label: 'Bouger' },
    { color: 'var(--apple-green)', progress: exercise, label: 'M\'entraîner' },
    { color: 'var(--apple-blue)', progress: stand, label: 'Me lever' },
  ];

  const center = size / 2;
  const gap = strokeWidth + 4;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring-progress">
        {rings.map((ring, index) => {
          const radius = center - strokeWidth / 2 - (index * gap);
          const circumference = 2 * Math.PI * radius;
          const progress = Math.min(ring.progress, 100);
          const offset = circumference - (progress / 100) * circumference;

          return (
            <g key={index}>
              {/* Track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                className="ring-track"
                strokeWidth={strokeWidth}
                style={{ opacity: 0.3 }}
              />
              {/* Fill */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                className="ring-fill"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{
                  filter: `drop-shadow(0 0 6px ${ring.color})`,
                }}
              />
              {/* End cap glow for completed rings */}
              {progress >= 100 && (
                <circle
                  cx={center}
                  cy={center - radius}
                  r={strokeWidth / 2}
                  fill={ring.color}
                  style={{
                    filter: `drop-shadow(0 0 8px ${ring.color})`,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ActivityRingsSummary({ move = 0, exercise = 0, stand = 0 }) {
  const stats = [
    { color: 'var(--apple-red)', value: move, label: 'Bouger', unit: '%' },
    { color: 'var(--apple-green)', value: exercise, label: 'Exercice', unit: '%' },
    { color: 'var(--apple-blue)', value: stand, label: 'Debout', unit: '%' },
  ];

  return (
    <div className="flex justify-around">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div 
            className="text-2xl font-bold tabular-nums"
            style={{ color: stat.color }}
          >
            {Math.round(stat.value)}{stat.unit}
          </div>
          <div 
            className="text-xs mt-1"
            style={{ color: 'var(--apple-text-secondary)' }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
