import React, { useEffect } from 'react';
import type { Stories } from '../services/storyServices';
import '../styles/global.css';

interface StoryListProps {
  allStories: Stories[];
  onSelect: (story: Stories) => void;
  seenList: number[];
}

const StoryList: React.FC<StoryListProps> = ({ allStories, onSelect, seenList }) => {

  return (
    <div className="stories_wrapper">
      {allStories.map((story) => (
        <div
          key={story.id}
          onClick={() => onSelect(story)}
          style={{margin: '10px', flex: '0 0 auto' }}
          
        >
          <div className='profile-image-wrapper' style={seenList.includes(story.id) ? {outline: '2px solid grey'} : {outline: '2px solid blue'}}>
            <img src={story.profile_pic} alt="story" className='profile-image'/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
