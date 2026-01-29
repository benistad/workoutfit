import { ActivityRings } from './ActivityRings';
import { HealthStats, WeeklyProgress, StreakBadge } from './HealthStats';

export function WorkoutProgress({ workout, completedDays, onSelectDay, onReset, onBackToSelector }) {
  const totalDays = workout.days.length;
  const completedCount = completedDays.length;
  const progressPercent = (completedCount / totalDays) * 100;
  const nextDay = completedDays.length > 0 
    ? Math.min(Math.max(...completedDays) + 1, totalDays)
    : 1;
  
  // Calculate streak
  const calculateStreak = () => {
    if (completedDays.length === 0) return 0;
    const sorted = [...completedDays].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i] - sorted[i + 1] === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };
  
  const streak = calculateStreak();
  const currentWeek = Math.ceil(nextDay / 7);

  return (
    <div className="min-h-screen min-h-dvh" style={{ backgroundColor: 'var(--apple-bg)' }}>
      {/* Apple-style header with back button - NOT sticky to avoid overlap */}
      <header className="safe-top" style={{ backgroundColor: 'var(--apple-bg)' }}>
        <div className="px-4 pt-2 pb-4 max-w-lg mx-auto">
          {/* Back to programs */}
          <button
            onClick={onBackToSelector}
            className="flex items-center gap-0.5 py-2 -ml-2 px-2 transition-opacity active:opacity-50 touch-target"
            style={{ color: 'var(--apple-blue)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="apple-body">Programmes</span>
          </button>
          <h1 className="apple-large-title mt-1" style={{ color: 'var(--apple-text-primary)' }}>
            Résumé
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32 max-w-lg mx-auto">
        {/* Program Details */}
        <div className="grid grid-cols-4 gap-2 mb-3 animate-slide-up">
          {/* Duration */}
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="var(--apple-blue)" strokeWidth="2" fill="none"/>
              <path d="M3 10H21" stroke="var(--apple-blue)" strokeWidth="2"/>
              <path d="M8 2V6" stroke="var(--apple-blue)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 2V6" stroke="var(--apple-blue)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div 
              className="text-[15px] font-bold tabular-nums mt-1"
              style={{ color: 'var(--apple-blue)' }}
            >
              {workout.duration}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              JOURS
            </div>
          </div>
          
          {/* Time per session */}
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="var(--apple-green)" strokeWidth="2" fill="none"/>
              <path d="M12 7V12L15 14" stroke="var(--apple-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div 
              className="text-[15px] font-bold tabular-nums mt-1"
              style={{ color: 'var(--apple-green)' }}
            >
              {workout.estimatedMinutes || 15}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              MIN
            </div>
          </div>
          
          {/* Equipment */}
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            {workout.equipment === 'none' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="var(--apple-teal)" strokeWidth="2" fill="none"/>
                <path d="M8 12L11 15L16 9" stroke="var(--apple-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="10" width="4" height="4" rx="1" fill="var(--apple-orange)"/>
                <rect x="18" y="10" width="4" height="4" rx="1" fill="var(--apple-orange)"/>
                <rect x="6" y="8" width="12" height="8" rx="1" stroke="var(--apple-orange)" strokeWidth="2" fill="none"/>
              </svg>
            )}
            <div 
              className="text-[13px] font-semibold mt-1 text-center leading-tight"
              style={{ color: workout.equipment === 'none' ? 'var(--apple-teal)' : 'var(--apple-orange)' }}
            >
              {workout.equipment === 'none' ? 'Aucun' : 'Requis'}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              ÉQUIP.
            </div>
          </div>
          
          {/* Difficulty */}
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level}
                  className="w-2 h-4 rounded-sm"
                  style={{ 
                    backgroundColor: level <= (workout.difficulty || 2)
                      ? 'var(--apple-red)' 
                      : 'var(--apple-fill-tertiary)'
                  }}
                />
              ))}
            </div>
            <div 
              className="text-[13px] font-semibold mt-1"
              style={{ color: 'var(--apple-red)' }}
            >
              {workout.difficultyLabel || 'Débutant'}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              NIVEAU
            </div>
          </div>
        </div>

        {/* Activity Rings Card */}
        <div className="apple-card p-5 mb-3 animate-scale-in stagger-1">
          <div className="flex items-center gap-5">
            <ActivityRings 
              move={progressPercent} 
              exercise={progressPercent} 
              stand={Math.min(progressPercent * 1.2, 100)} 
              size={120} 
              strokeWidth={11} 
            />
            <div className="flex-1 min-w-0">
              <p className="apple-caption mb-1">
                {workout.name}
              </p>
              <p 
                className="text-[40px] font-bold tabular-nums leading-none"
                style={{ color: 'var(--apple-text-primary)' }}
              >
                {Math.round(progressPercent)}%
              </p>
              <p 
                className="apple-footnote mt-2"
                style={{ color: 'var(--apple-text-secondary)' }}
              >
                {completedCount} sur {totalDays} jours
              </p>
              
              {/* Streak badge */}
              {streak >= 3 && (
                <div className="mt-2">
                  <StreakBadge streak={streak} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Stats */}
        <div className="mb-3 animate-slide-up stagger-2">
          <HealthStats 
            completedDays={completedCount} 
            totalDays={totalDays}
            streak={streak}
          />
        </div>

        {/* Weekly Progress */}
        <div className="mb-3 animate-slide-up stagger-2">
          <WeeklyProgress 
            completedDays={completedDays}
            currentWeek={currentWeek}
          />
        </div>

        {/* Continue Button - Apple style */}
        <button
          onClick={() => onSelectDay(nextDay)}
          className="w-full apple-card mb-3 flex items-center justify-between haptic touch-target animate-slide-up stagger-3 apple-pressable"
        >
          <div className="flex items-center gap-3 p-4">
            <div 
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--apple-green)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="black" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p 
                className="apple-headline"
                style={{ color: 'var(--apple-text-primary)' }}
              >
                {completedCount === 0 ? 'Commencer' : 'Continuer'}
              </p>
              <p 
                className="apple-subheadline truncate"
                style={{ color: 'var(--apple-text-secondary)' }}
              >
                Jour {nextDay} — {workout.days[nextDay - 1]?.title}
              </p>
            </div>
          </div>
          <div className="pr-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2.5}
              style={{ color: 'var(--apple-text-quaternary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Calendar Section */}
        <section className="animate-slide-up stagger-4">
          <h2 
            className="apple-title-3 mb-2"
            style={{ color: 'var(--apple-text-primary)' }}
          >
            Calendrier
          </h2>
          
          <div className="apple-card p-4">
            <div className="grid grid-cols-7 gap-1">
              {workout.days.map((day) => {
                const isCompleted = completedDays.includes(day.day);
                const isCurrent = day.day === nextDay;
                const isLocked = day.day > nextDay && !isCompleted;
                
                return (
                  <button
                    key={day.day}
                    onClick={() => !isLocked && onSelectDay(day.day)}
                    disabled={isLocked}
                    className="aspect-square rounded-full flex items-center justify-center text-[13px] font-medium touch-target haptic"
                    style={{ 
                      backgroundColor: isCompleted 
                        ? 'var(--apple-green)' 
                        : isCurrent 
                        ? 'var(--apple-fill-tertiary)'
                        : 'transparent',
                      color: isCompleted 
                        ? 'black' 
                        : isCurrent 
                        ? 'var(--apple-text-primary)'
                        : isLocked 
                        ? 'var(--apple-text-quaternary)' 
                        : 'var(--apple-text-secondary)',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      border: isCurrent && !isCompleted ? '2px solid var(--apple-green)' : 'none'
                    }}
                  >
                    {isCompleted ? '✓' : day.day}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Day List */}
        <section className="mt-4 animate-slide-up stagger-5">
          <h2 
            className="apple-title-3 mb-2"
            style={{ color: 'var(--apple-text-primary)' }}
          >
            Tous les jours
          </h2>
          
          <div className="apple-card overflow-hidden">
            {workout.days.slice(0, 10).map((day, index) => {
              const isCompleted = completedDays.includes(day.day);
              const isCurrent = day.day === nextDay;
              
              return (
                <div key={day.day}>
                  <button
                    onClick={() => onSelectDay(day.day)}
                    className="w-full apple-row apple-pressable touch-target"
                  >
                    <div 
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium flex-shrink-0"
                      style={{ 
                        backgroundColor: isCompleted 
                          ? 'var(--apple-green)' 
                          : isCurrent 
                          ? 'var(--apple-fill-tertiary)'
                          : 'var(--apple-fill-secondary)',
                        color: isCompleted 
                          ? 'black' 
                          : 'var(--apple-text-secondary)',
                        border: isCurrent && !isCompleted ? '2px solid var(--apple-green)' : 'none'
                      }}
                    >
                      {isCompleted ? '✓' : day.day}
                    </div>
                    
                    <div className="flex-1 text-left min-w-0">
                      <p 
                        className="apple-body truncate"
                        style={{ 
                          color: isCompleted 
                            ? 'var(--apple-green)' 
                            : 'var(--apple-text-primary)'
                        }}
                      >
                        {day.title}
                      </p>
                    </div>
                    
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3.5 w-3.5 flex-shrink-0" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2.5}
                      style={{ color: 'var(--apple-text-quaternary)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {index < 9 && <div className="apple-separator" />}
                </div>
              );
            })}
            
            {workout.days.length > 10 && (
              <button 
                className="w-full py-3 text-center apple-pressable"
                onClick={() => {}}
              >
                <span 
                  className="apple-subheadline"
                  style={{ color: 'var(--apple-blue)' }}
                >
                  Voir les {workout.days.length - 10} autres jours
                </span>
              </button>
            )}
          </div>
        </section>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="w-full mt-8 py-3 apple-body transition-opacity active:opacity-50 touch-target"
          style={{ color: 'var(--apple-red)' }}
        >
          Réinitialiser la progression
        </button>
      </main>
    </div>
  );
}
