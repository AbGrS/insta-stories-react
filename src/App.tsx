import React, { useState } from 'react';
import StoryList from './components/storyList';
import StoryContainer from './components/StoryContainer';
import type { Story } from './services/storyServices';

const App: React.FC = () => {
  const [storyData, setStoryData] = useState<Story[]>([]);

  const handleSelect = (stories: Story[]) => {
    setStoryData(stories);
  };

  return (
    <div>
      <StoryList onSelect={handleSelect} />
      <StoryContainer stories={storyData}/>
    </div>
  );
};

export default App;
