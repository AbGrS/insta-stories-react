import React, { useEffect, useState } from 'react';
import { fetchStories } from '../services/storyServices';
import type { Stories, Story } from '../services/storyServices';
import '../styles/global.css';

interface StoryListProps {
  onSelect: (story: Story[]) => void;
}

const StoryList: React.FC<StoryListProps> = ({ onSelect }) => {
  const [allStories, seAllStories] = useState<Stories[]>([]);

  useEffect(() => {
    fetchStories().then(seAllStories);
  }, []);

  return (
    <div className="stories_wrapper">
      {allStories.map((story) => (
        <div
          key={story.id}
          onClick={() => onSelect(story.stories)}
          style={{margin: '10px', flex: '0 0 auto' }}
        >
          <div>
            <img src={story.profile_pic} alt="story" className='profile-image'/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
