import React, { useEffect, useState, useRef } from 'react';
import type { Story } from '../services/storyServices';
import ProgressBar from './ProgressBar';

interface StoryContainerProps {
  stories: Story[];
  fetchNextStory: (prevStoryId: number) => void;
  currentRunningId: number;
}

const StoryContainer: React.FC<StoryContainerProps> = ({ stories, fetchNextStory, currentRunningId}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsImageLoaded(false);
    setCurrentIndex(0);
  }, [stories]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [currentIndex]);

  const startTimer = () => {
    const duration = stories[currentIndex]?.duration || 5000;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      nextStory();
    }, duration);
  };

  const nextStory = () => {
    setCurrentIndex((prev) => {
      if (prev < stories.length - 1) {
        return prev + 1;
      }
      fetchNextStory(currentRunningId);
      return prev;
    });
    
  };

  const prevStory = () => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
    
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    if (clickX < halfWidth) {
      prevStory();
    } else {
      nextStory();
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    startTimer();
  };

  return (
    <div onClick={handleClick} ref={containerRef}>
      {isImageLoaded && (
        <ProgressBar
          key={stories[currentIndex].id}
          duration={stories[currentIndex].duration || 5000}
        />
      )}

      <img
        src={`${stories[currentIndex].imgUrl}?id=${Date.now()}`}
        alt="story"
        onLoad={handleImageLoad}
        style={{ width: '100%', height: '100%', objectFit: 'cover',  opacity: isImageLoaded ? 1 : 0,
          transition: 'opacity 300ms ease-in-out', }}
       

      />
    </div>
  );
};

export default StoryContainer;
