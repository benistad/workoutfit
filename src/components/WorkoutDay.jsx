import { useState } from 'react';
import { TimerIcon, FlameIcon } from './AppleIcons';

export function WorkoutDay({ workout, currentDay, progress, onCompleteDay, onBack }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  
  const dayData = workout.days.find(d => d.day === currentDay);
  const isCompleted = progress[currentDay];
  const totalDays = workout.days.length;
  const progressPercent = Math.round((currentDay / totalDays) * 100);

  if (!dayData) {
    return (
      <div className="min-h-screen min-h-dvh flex items-center justify-center" style={{ backgroundColor: 'var(--apple-bg)' }}>
        <p style={{ color: 'var(--apple-text-secondary)' }}>Jour non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-dvh" style={{ backgroundColor: 'var(--apple-bg)' }}>
      {/* Apple-style navigation header - NOT sticky to avoid overlap */}
      <header className="safe-top" style={{ backgroundColor: 'var(--apple-bg)' }}>
        <div className="px-4 pt-2 pb-3 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            {/* Back button - iOS style */}
            <button
              onClick={onBack}
              className="flex items-center gap-0.5 py-2 -ml-2 px-2 transition-opacity active:opacity-50 touch-target"
              style={{ color: 'var(--apple-blue)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="apple-body">Résumé</span>
            </button>
            
            {/* Day indicator */}
            <span 
              className="apple-footnote font-medium tabular-nums"
              style={{ color: 'var(--apple-text-secondary)' }}
            >
              {currentDay}/{totalDays}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32 max-w-lg mx-auto">
        {/* Day title card */}
        <div className="apple-card p-4 mb-3 animate-scale-in">
          <div className="flex items-center gap-4">
            {/* Day number circle */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold flex-shrink-0"
              style={{ 
                backgroundColor: isCompleted ? 'var(--apple-green)' : 'var(--apple-fill-tertiary)',
                color: isCompleted ? 'black' : 'var(--apple-text-primary)'
              }}
            >
              {isCompleted ? '✓' : currentDay}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="apple-caption mb-0.5">
                Jour {currentDay}
              </p>
              <h1 
                className="apple-title-2 truncate"
                style={{ color: 'var(--apple-text-primary)' }}
              >
                {dayData.title}
              </h1>
            </div>
          </div>
          
          {/* Mini progress bar */}
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="apple-caption-1" style={{ color: 'var(--apple-text-secondary)' }}>Progression</span>
              <span className="apple-caption-1 font-medium tabular-nums" style={{ color: 'var(--apple-green)' }}>{progressPercent}%</span>
            </div>
            <div 
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--apple-fill-tertiary)' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercent}%`,
                  backgroundColor: 'var(--apple-green)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Workout stats */}
        <div className="grid grid-cols-3 gap-2 mb-3 animate-slide-up stagger-1">
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <TimerIcon size={28} color="var(--apple-blue)" />
            <div className="text-[17px] font-bold tabular-nums mt-1" style={{ color: 'var(--apple-blue)' }}>~20</div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>MINUTES</div>
          </div>
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <FlameIcon size={28} />
            <div className="text-[17px] font-bold tabular-nums mt-1" style={{ color: 'var(--apple-red)' }}>~150</div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>CALORIES</div>
          </div>
          <div className="apple-card py-3 px-2 flex flex-col items-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4Z" fill="var(--apple-green)"/>
              <path d="M20 11C20 11 18 9 15 9H9C6 9 4 11 4 11L6 13H8V20H10V14H14V20H16V13H18L20 11Z" fill="var(--apple-green)"/>
            </svg>
            <div className="text-[17px] font-bold mt-1" style={{ color: 'var(--apple-green)' }}>Core</div>
            <div className="apple-caption-2 mt-0.5" style={{ color: 'var(--apple-text-tertiary)' }}>FOCUS</div>
          </div>
        </div>

        {/* Exercise image card */}
        <div className="animate-slide-up stagger-2">
          <h2 
            className="apple-title-3 mb-2"
            style={{ color: 'var(--apple-text-primary)' }}
          >
            Exercices
          </h2>
          
          <div 
            className="apple-card overflow-hidden cursor-pointer haptic relative"
            onClick={() => setImageZoomed(true)}
          >
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div 
                className="aspect-[3/4] flex items-center justify-center"
                style={{ backgroundColor: 'var(--apple-bg-secondary)' }}
              >
                <div className="text-center">
                  <div 
                    className="w-7 h-7 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-2" 
                    style={{ borderColor: 'var(--apple-green)', borderTopColor: 'transparent' }} 
                  />
                  <span className="apple-footnote" style={{ color: 'var(--apple-text-tertiary)' }}>
                    Chargement...
                  </span>
                </div>
              </div>
            )}
            
            {/* Exercise image */}
            <img 
              src={dayData.image} 
              alt={dayData.title}
              className={`w-full ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Tap hint overlay */}
            {imageLoaded && (
              <div 
                className="absolute bottom-0 left-0 right-0 p-3 text-center"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
              >
                <span className="apple-caption-1" style={{ color: 'var(--apple-text-secondary)' }}>
                  Appuyez pour agrandir
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA - Apple style */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-20 px-4 pt-3 pb-4 safe-bottom apple-glass-thick"
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => onCompleteDay(currentDay)}
            className={`w-full apple-button haptic touch-target ${isCompleted ? '' : 'apple-button-green'}`}
            style={isCompleted ? { 
              backgroundColor: 'var(--apple-fill-tertiary)',
              color: 'var(--apple-text-secondary)'
            } : {}}
          >
            {isCompleted ? (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Terminé
              </span>
            ) : (
              `Terminer le jour ${currentDay}`
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen zoom overlay - iOS style */}
      {imageZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
          style={{ backgroundColor: 'black' }}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 safe-top w-10 h-10 rounded-full flex items-center justify-center touch-target"
            style={{ backgroundColor: 'var(--apple-bg-tertiary)' }}
            onClick={() => setImageZoomed(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--apple-text-primary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Zoomable image */}
          <div 
            className="w-full h-full overflow-auto hide-scrollbar flex items-center justify-center p-4"
            onClick={() => setImageZoomed(false)}
          >
            <img 
              src={dayData.image} 
              alt={dayData.title}
              className="max-w-none w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Bottom hint */}
          <div className="absolute bottom-8 left-0 right-0 text-center safe-bottom">
            <span 
              className="text-sm px-4 py-2 rounded-full"
              style={{ 
                backgroundColor: 'var(--apple-bg-tertiary)',
                color: 'var(--apple-text-secondary)'
              }}
            >
              Appuyez n'importe où pour fermer
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
