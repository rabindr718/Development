import { useEffect, useRef } from 'react';

// Define the types for the hook
type IdleTimerProps = {
  onIdle: () => void;
  timeout: number;
};

const useIdleTimer = ({ onIdle, timeout }: IdleTimerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to reset the timer
    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(onIdle, timeout);
    };

    // Event listeners to track user interactions
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    // Start the timer initially
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [onIdle, timeout]);

  return null;
};

export default useIdleTimer;
