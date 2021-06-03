import React from 'react';
import { User } from '../../models/user';

interface UserInfoProps {
  user: User;
  updateTitle: () => {};
  updateDescription: () => {};
}
const UserInfo: React.FC<UserInfoProps> = ({
  user,
  updateTitle,
  updateDescription,
}) => {
  return (
    <div className='flex flex-col w-5/6 h-full p-4 bg-white rounded-lg'>
      <h1 className='flex items-center space-x-2 text-3xl text-gray-500 border-b-2'>
        <span>{user.title} </span>
        <svg
          onClick={updateTitle}
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 cursor-pointer hover:text-blue-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
          />
        </svg>
      </h1>
      <p
        onClick={updateDescription}
        className='py-2 cursor-pointer hover:text-blue-500'
      >
        {user.description}
      </p>
    </div>
  );
};

export default UserInfo;
