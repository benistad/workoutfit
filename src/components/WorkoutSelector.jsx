import { workouts } from '../data/workouts';
import { ActivityRings } from './ActivityRings';
import { FlameIcon, TimerIcon, ListIcon, CalendarIcon, ClockIcon, CheckCircleIcon } from './AppleIcons';

export function WorkoutSelector({ onSelectWorkout, allProgress = {}, globalStats = {} }) {
  // Calculate global progress percentage
  const totalPossibleDays = workouts.reduce((sum, w) => sum + w.duration, 0);
  const globalProgressPercent = totalPossibleDays > 0 
    ? Math.round((globalStats.totalCompletedDays / totalPossibleDays) * 100)
    : 0;

  return (
    <div className="min-h-screen min-h-dvh" style={{ backgroundColor: 'var(--apple-bg)' }}>
      <div className="pb-10 max-w-lg mx-auto">
        {/* Apple-style large title header */}
        <header className="safe-top px-4 pt-2 pb-4 animate-slide-up">
          <h1 className="apple-large-title" style={{ color: 'var(--apple-text-primary)' }}>
            Fitness
          </h1>
        </header>

        {/* Global Activity Rings Hero Card */}
        <div className="mx-4 apple-card p-5 mb-4 animate-scale-in stagger-1">
          <div className="flex items-center gap-5">
            <ActivityRings 
              move={globalProgressPercent} 
              exercise={globalProgressPercent} 
              stand={Math.min(globalProgressPercent * 1.2, 100)} 
              size={110} 
              strokeWidth={10} 
            />
            <div className="flex-1 min-w-0">
              <p className="apple-caption mb-1">
                Progression globale
              </p>
              <p 
                className="text-[32px] font-bold tabular-nums leading-tight"
                style={{ color: 'var(--apple-text-primary)' }}
              >
                {globalProgressPercent}%
              </p>
              <p 
                className="apple-footnote mt-1"
                style={{ color: 'var(--apple-text-secondary)' }}
              >
                {globalStats.totalCompletedDays || 0} jours complétés
              </p>
            </div>
          </div>
        </div>

        {/* Global Stats Cards */}
        <div className="px-4 grid grid-cols-3 gap-2 mb-6 animate-slide-up stagger-2">
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <FlameIcon size={28} />
            <div 
              className="text-[17px] font-bold tabular-nums mt-1"
              style={{ color: 'var(--apple-red)' }}
            >
              {(globalStats.totalCalories || 0).toLocaleString()}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              CALORIES
            </div>
          </div>
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <TimerIcon size={28} />
            <div 
              className="text-[17px] font-bold tabular-nums mt-1"
              style={{ color: 'var(--apple-green)' }}
            >
              {globalStats.totalMinutes || 0}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              MINUTES
            </div>
          </div>
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <ListIcon size={28} />
            <div 
              className="text-[17px] font-bold tabular-nums mt-1"
              style={{ color: 'var(--apple-blue)' }}
            >
              {globalStats.programsStarted || 0}
            </div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>
              PROGRAMMES
            </div>
          </div>
        </div>
        
        {/* Section title */}
        <div className="px-4 mb-2 animate-slide-up stagger-3">
          <h2 
            className="apple-title-3"
            style={{ color: 'var(--apple-text-primary)' }}
          >
            Programmes
          </h2>
        </div>

        {/* Workout Cards - Apple style */}
        <div className="px-4 space-y-3">
          {workouts.map((workout, index) => {
            const workoutProgress = allProgress[workout.id] || [];
            const progressPercent = Math.round((workoutProgress.length / workout.duration) * 100);
            const hasStarted = workoutProgress.length > 0;
            const isCompleted = progressPercent >= 100;
            
            return (
              <button
                key={workout.id}
                onClick={() => onSelectWorkout(workout)}
                className={`animate-slide-up stagger-${index + 4} w-full text-left apple-card overflow-hidden haptic touch-target`}
              >
                {/* Workout image */}
                {workout.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={workout.image} 
                      alt={workout.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                      }}
                    />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 
                        className="apple-title-2"
                        style={{ color: 'var(--apple-text-primary)' }}
                      >
                        {workout.name}
                      </h3>
                      {workout.subtitle && (
                        <p 
                          className="apple-subheadline mt-0.5"
                          style={{ color: 'var(--apple-text-secondary)' }}
                        >
                          {workout.subtitle}
                        </p>
                      )}
                      
                      {/* Progress bar inside image */}
                      {hasStarted && (
                        <div className="mt-3">
                          <div 
                            className="h-1 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                          >
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${progressPercent}%`,
                                backgroundColor: isCompleted ? 'var(--apple-green)' : 'var(--apple-blue)'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Progress badge */}
                    {hasStarted && (
                      <div 
                        className="absolute top-3 right-3 apple-pill"
                        style={{ 
                          backgroundColor: isCompleted ? 'var(--apple-green)' : 'rgba(0,0,0,0.6)',
                          backdropFilter: 'blur(10px)',
                          color: isCompleted ? 'black' : 'var(--apple-text-primary)'
                        }}
                      >
                        {isCompleted ? '✓ Terminé' : `${progressPercent}%`}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Stats bar */}
                <div 
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderTop: '0.5px solid var(--apple-separator)' }}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon size={16} color="var(--apple-text-secondary)" />
                      <span 
                        className="apple-subheadline"
                        style={{ color: 'var(--apple-text-primary)' }}
                      >
                        {workout.duration} jours
                      </span>
                    </div>
                    {workout.equipment === 'none' && (
                      <div className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="9" stroke="var(--apple-text-secondary)" strokeWidth="2" fill="none"/>
                          <path d="M8 12L11 15L16 9" stroke="var(--apple-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span 
                          className="apple-subheadline"
                          style={{ color: 'var(--apple-text-primary)' }}
                        >
                          Sans équipement
                        </span>
                      </div>
                    )}
                    {workout.difficulty && (
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div 
                              key={level}
                              className="w-2 h-2 rounded-sm"
                              style={{ 
                                backgroundColor: level <= workout.difficulty 
                                  ? 'var(--apple-red)' 
                                  : 'var(--apple-fill-tertiary)'
                              }}
                            />
                          ))}
                        </div>
                        <span 
                          className="apple-caption-1"
                          style={{ color: 'var(--apple-text-secondary)' }}
                        >
                          {workout.difficultyLabel}
                        </span>
                      </div>
                    )}
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 flex-shrink-0" 
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
            );
          })}
        </div>

        {/* Bottom tip */}
        <p 
          className="apple-footnote text-center mt-8 px-8"
          style={{ color: 'var(--apple-text-tertiary)' }}
        >
          Entraînez-vous régulièrement pour remplir vos anneaux d'activité
        </p>
      </div>
    </div>
  );
}
