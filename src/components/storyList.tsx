import React from 'react';
import type { Stories, Story } from '../services/storyServices';
import '../styles/global.css';

interface StoryListProps {
  allStories: Stories[];
  onSelect: (story: Stories) => void;
  currentRunningId: number;
}

const StoryList: React.FC<StoryListProps> = ({ allStories, onSelect, currentRunningId }) => {

  return (
    <div className="stories_wrapper">
      {allStories.map((story) => (
        <div
          key={story.id}
          onClick={() => onSelect(story)}
          style={{margin: '10px', flex: '0 0 auto' }}
          
        >
          <div className='profile-image-wrapper' style={currentRunningId === story.id ? {outline: '2px solid grey'} : {outline: '2px solid blue'}}>
            <img src={story.profile_pic} alt="story" className='profile-image'/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
