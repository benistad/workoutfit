import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WorkoutSelector } from './components/WorkoutSelector';
import { WorkoutProgress } from './components/WorkoutProgress';
import { WorkoutDay } from './components/WorkoutDay';

function App() {
  // Multi-program support: store progress per workout ID
  const [allProgress, setAllProgress] = useLocalStorage('allProgress', {});
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  // Get completed days for active workout
  const completedDays = activeWorkout ? (allProgress[activeWorkout.id] || []) : [];

  // Calculate global stats across all programs
  const globalStats = {
    totalCompletedDays: Object.values(allProgress).reduce((sum, days) => sum + days.length, 0),
    totalCalories: Object.values(allProgress).reduce((sum, days) => sum + days.length * 150, 0),
    totalMinutes: Object.values(allProgress).reduce((sum, days) => sum + days.length * 20, 0),
    programsStarted: Object.keys(allProgress).filter(id => allProgress[id].length > 0).length,
  };

  const handleSelectWorkout = (workout) => {
    setActiveWorkout(workout);
  };

  const handleSelectDay = (day) => {
    setCurrentDay(day);
  };

  const handleCompleteDay = (day) => {
    if (activeWorkout) {
      const currentProgress = allProgress[activeWorkout.id] || [];
      if (!currentProgress.includes(day)) {
        setAllProgress({
          ...allProgress,
          [activeWorkout.id]: [...currentProgress, day]
        });
      }
    }
    setCurrentDay(null);
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser la progression de ce programme ?')) {
      if (activeWorkout) {
        setAllProgress({
          ...allProgress,
          [activeWorkout.id]: []
        });
      }
      setActiveWorkout(null);
    }
  };

  const handleBack = () => {
    setCurrentDay(null);
  };

  const handleBackToSelector = () => {
    setActiveWorkout(null);
    setCurrentDay(null);
  };

  const dayProgress = completedDays.reduce((acc, day) => {
    acc[day] = true;
    return acc;
  }, {});

  if (!activeWorkout) {
    return (
      <WorkoutSelector 
        onSelectWorkout={handleSelectWorkout} 
        allProgress={allProgress}
        globalStats={globalStats}
      />
    );
  }

  if (currentDay) {
    return (
      <WorkoutDay
        workout={activeWorkout}
        currentDay={currentDay}
        progress={dayProgress}
        onCompleteDay={handleCompleteDay}
        onBack={handleBack}
      />
    );
  }

  return (
    <WorkoutProgress
      workout={activeWorkout}
      completedDays={completedDays}
      onSelectDay={handleSelectDay}
      onReset={handleReset}
      onBackToSelector={handleBackToSelector}
    />
  );
}

export default App;
