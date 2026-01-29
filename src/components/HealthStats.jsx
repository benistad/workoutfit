import { FlameIcon, TimerIcon, StreakIcon } from './AppleIcons';

export function HealthStats({ completedDays = 0, totalDays = 30, streak = 0 }) {
  const calories = completedDays * 150;
  const minutes = completedDays * 20;
  
  const stats = [
    { 
      Icon: FlameIcon, 
      value: calories, 
      unit: 'CAL', 
      color: 'var(--apple-red)'
    },
    { 
      Icon: TimerIcon, 
      value: minutes, 
      unit: 'MIN', 
      color: 'var(--apple-green)'
    },
    { 
      Icon: StreakIcon, 
      value: streak, 
      unit: 'JOURS', 
      color: 'var(--apple-orange)'
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="apple-card py-3 px-2 flex flex-col items-center animate-scale-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <stat.Icon size={28} color={stat.color} />
          <div 
            className="text-[17px] font-bold tabular-nums mt-1"
            style={{ color: stat.color }}
          >
            {stat.value.toLocaleString()}
          </div>
          <div 
            className="apple-caption-2 mt-0.5"
            style={{ color: 'var(--apple-text-tertiary)' }}
          >
            {stat.unit}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WeeklyProgress({ completedDays = [], currentWeek = 1 }) {
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const startDay = (currentWeek - 1) * 7 + 1;
  const weekCompleted = completedDays.filter(d => d >= startDay && d < startDay + 7).length;
  
  return (
    <div className="apple-card p-4">
      <div className="flex items-center justify-between mb-3">
        <span 
          className="apple-footnote font-medium"
          style={{ color: 'var(--apple-text-secondary)' }}
        >
          SEMAINE {currentWeek}
        </span>
        <span 
          className="apple-footnote font-semibold tabular-nums"
          style={{ color: 'var(--apple-green)' }}
        >
          {weekCompleted}/7
        </span>
      </div>
      
      <div className="flex justify-between">
        {weekDays.map((day, index) => {
          const dayNumber = startDay + index;
          const isCompleted = completedDays.includes(dayNumber);
          const isToday = dayNumber === Math.max(...completedDays, 0) + 1;
          
          return (
            <div key={index} className="flex flex-col items-center gap-1.5">
              <span 
                className="apple-caption-2"
                style={{ color: 'var(--apple-text-tertiary)' }}
              >
                {day}
              </span>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium"
                style={{ 
                  backgroundColor: isCompleted 
                    ? 'var(--apple-green)' 
                    : isToday 
                    ? 'var(--apple-fill-tertiary)'
                    : 'transparent',
                  color: isCompleted 
                    ? 'black' 
                    : isToday 
                    ? 'var(--apple-text-primary)'
                    : 'var(--apple-text-tertiary)',
                  border: isToday && !isCompleted ? '2px solid var(--apple-green)' : 'none'
                }}
              >
                {isCompleted ? '✓' : dayNumber}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StreakBadge({ streak = 0 }) {
  if (streak < 3) return null;
  
  const badges = [
    { min: 3, label: '3 jours', icon: '🔥' },
    { min: 7, label: '1 semaine', icon: '⭐' },
    { min: 14, label: '2 semaines', icon: '💪' },
    { min: 21, label: '3 semaines', icon: '🏆' },
    { min: 30, label: '30 jours', icon: '👑' },
  ];
  
  const currentBadge = [...badges].reverse().find(b => streak >= b.min);
  
  return (
    <div 
      className="apple-pill gap-1.5"
      style={{ backgroundColor: 'var(--apple-orange)', color: 'black' }}
    >
      <span className="text-[15px]">{currentBadge.icon}</span>
      <span className="apple-footnote font-semibold">Série de {streak} jours!</span>
    </div>
  );
}
