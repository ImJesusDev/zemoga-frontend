import React from 'react';
import { Tweet, User } from '../../models';
import TimelineItem from '../timeline-item/TimelineItem';

interface TimelineProps {
  tweets: Tweet[];
  user: User;
  updateUsername: () => {};
}

const Timeline: React.FC<TimelineProps> = ({
  tweets,
  user,
  updateUsername,
}) => {
  return (
    <div className='py-4 overflow-y-auto bg-white rounded-lg w-96 h-4/5'>
      <h1
        onClick={updateUsername}
        className='py-2 text-2xl font-bold text-center cursor-pointer hover:text-blue-500'
      >
        {user.username}'s Timeline
      </h1>
      <div className='p-4 border-t-2'>
        {tweets.map((tweet) => (
          <TimelineItem key={tweet.id} tweet={tweet} />
        ))}
      </div>
      <div className='flex justify-start w-full px-4'>
        <a
          target='_blank'
          rel='noreferrer'
          className='flex text-blue-500'
          href={`https://twitter.com/${user.username}`}
        >
          Go to account{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Timeline;
