import React from 'react';
import { Tweet } from '../../models';

interface TimelineItemProps {
  tweet: Tweet;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ tweet }) => {
  return (
    <div className='flex items-center justify-center space-x-4 '>
      <img
        className='w-12 h-12 rounded-full'
        src={tweet.user.profile_image_url_https}
        alt={tweet.user.screen_name}
      />
      <div className='flex flex-col items-start py-4 max-h-{200px}'>
        <h2 className='text-xl font-bold'>{tweet.user.name}</h2>
        <p className=''>{tweet.text}</p>
      </div>
    </div>
  );
};
export default TimelineItem;
