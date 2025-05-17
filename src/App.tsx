import React, { useState, useEffect } from 'react';
import StoryList from './components/storyList';
import StoryContainer from './components/StoryContainer';
import type { Story, Stories } from './services/storyServices';
import { fetchStories } from './services/storyServices';

const App: React.FC = () => {
  const [storyData, setStoryData] = useState<Story[]>([]);
  const [allStories, seAllStories] = useState<Stories[]>([]);
  const [currentRunningId, setCurrentRunningId] = useState<number>(0); 

  const [seenList, setSeenList] = React.useState<number[]>([]);

  useEffect(() => {
    setSeenList((prev)=>[...prev, currentRunningId]);
  }, [currentRunningId]);

  const handleSelect = (story: Stories) => {
    setCurrentRunningId(story.id);
    setStoryData(story.stories);
  };

  useEffect(() => {
    fetchStories().then(seAllStories);
  }, []);

  const fetchNextStory = (currentRunningId: number) => {
    const prevIndex = allStories.findIndex((story) => story.id === currentRunningId);
    const nextStory = allStories[(prevIndex + 1) % allStories.length];
    setStoryData(nextStory.stories);
    setCurrentRunningId(nextStory.id);
  }

  return (
    <div>
      <StoryList key={currentRunningId} allStories={allStories} onSelect={handleSelect} seenList={seenList}/>
      {storyData.length ? <StoryContainer stories={storyData} currentRunningId={currentRunningId} fetchNextStory={fetchNextStory}/> : ''}
    </div>
  );
};

export default App;
