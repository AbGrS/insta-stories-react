import React, { useEffect, useRef, useState } from 'react';

type ProgressBarProps = {
  duration: number;
  isPaused?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, isPaused = false }) => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  const animate = () => {
    const elapsed = Date.now() - startTimeRef.current;
    const percentage = Math.min((elapsed / duration) * 100, 100);
    setProgress(percentage);

    if (percentage < 100 && !isPaused) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startTimeRef.current = Date.now() - (progress / 100) * duration;
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current!);
  }, [isPaused]);

  return (
    <div style={{width: '100%'}} className='progress-bar'>
      <div style={{ width: `${progress}%`, border: '2px solid blue' }} />
    </div>
  );
};

export default ProgressBar;
