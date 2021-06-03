import React, { useEffect, useState, useRef } from 'react';
// Components
import Timeline from '../../components/timeline/Timeline';
import UserInfo from '../../components/user-info/UserInfo';
// Models
import { User } from '../../models';
// Libraries
import axios from 'axios';
import S3 from 'aws-sdk/clients/s3';
import Swal from 'sweetalert2';

const Portfolio: React.FC = () => {
  // Store tweets
  const [tweets, setTweets] = useState([]);
  // Store user
  const [user, setUser] = useState<User>({} as User);
  // File input ref
  const fileInput = useRef<HTMLInputElement>(null);
  // Get tweets function ref
  const getTweets = useRef(() => {});
  // Update profile function ref
  const updateProfile = useRef(() => {});

  const getUser = useRef((): Promise<void> => new Promise(() => {}));
  // Api url
  const apiUrl = process.env.REACT_APP_API_URL;

  // Configure S3
  const awsS3 = new S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });

  /**
   * Upload photo to s3
   */
  const uploadPhoto = async (file: File) => {
    // Create request object
    const params: S3.PutObjectRequest = {
      Bucket: process.env.REACT_APP_AWS_BUCKET!,
      Key: `zemoga/${file.name}`,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type,
    };
    // Return promise
    return awsS3.upload(params).promise();
  };

  // Load User
  getUser.current = async () => {
    const response = await axios.get(
      `${apiUrl}users/a431835b-da02-4c43-ae44-0c15134a3680`
    );
    setUser(response.data);
  };

  // Load tweets
  getTweets.current = async () => {
    const response = await axios.get(
      `${apiUrl}recent-tweets?username=${user?.username}`
    );
    setTweets(response.data);
  };

  // Load initial data
  useEffect(() => {
    // Get user profile
    getUser.current().then(() => {
      // After used is fetched, load tweets
      getTweets.current();
    });
  }, []);

  // Function to handle photo upload
  const handlePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const response = await uploadPhoto(file);
      setUser({ ...user, photo: response.Location });
      updateProfile.current();
    }
  };

  /**
   *  Function to update user's first and last name
   * */
  const updateName = async () => {
    const { value: formValues } = await Swal.fire({
      showCancelButton: true,
      html:
        `<label class="swal2-input-label">First name</label><input value='${user.firstName}' placeholder="First name" id="swal-input1" class="swal2-input">` +
        `<label class="swal2-input-label">Last name </label><input value='${user.lastName}' placeholder="Last name" id="swal-input2" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        const firstName = document.getElementById(
          'swal-input1'
        ) as HTMLInputElement;
        const lastName = document.getElementById(
          'swal-input2'
        ) as HTMLInputElement;
        return [firstName.value, lastName.value];
      },
    });
    if (formValues && formValues[0] && formValues[1]) {
      setUser({ ...user, firstName: formValues[0], lastName: formValues[1] });
      updateProfile.current();
    }
  };

  /**
   * Update user description
   */
  const updateDescription = async () => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Description',
      inputPlaceholder: 'Type your description here...',
      inputValue: user.description,
      inputAttributes: {
        'aria-label': 'Type your description here',
      },
      showCancelButton: true,
    });

    if (text) {
      setUser({ ...user, description: text });
      updateProfile.current();
    }
  };

  /**
   * Update user title
   */
  const updateTitle = async () => {
    const { value: formValues } = await Swal.fire({
      showCancelButton: true,
      html: `<label class="swal2-input-label">Title</label><input value='${user.title}' placeholder="Title" id="swal-input1" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById(
          'swal-input1'
        ) as HTMLInputElement;
        return [title.value];
      },
    });
    if (formValues && formValues[0]) {
      setUser({ ...user, title: formValues[0] });
      updateProfile.current();
    }
  };

  /**
   * Update username
   */
  const updateUsername = async () => {
    const { value: formValues } = await Swal.fire({
      showCancelButton: true,
      html: `<label class="swal2-input-label">Username</label><input value='${user.username}' placeholder="Username" id="swal-input1" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        const username = document.getElementById(
          'swal-input1'
        ) as HTMLInputElement;
        return [username.value];
      },
    });
    if (formValues && formValues[0]) {
      setUser({ ...user, username: formValues[0] });
      updateProfile.current();
      getTweets.current();
    }
  };

  // Function to update user profile
  updateProfile.current = async () => {
    console.log('update profile', user);
    const response = await axios.put(`${apiUrl}users/${user.userId}`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUser(response.data);
  };
  return (
    <div className='flex items-end justify-center w-full h-full py-8 space-x-8 bg-gray-300'>
      <div className='flex flex-col items-center h-5/6'>
        <img
          onClick={() => fileInput.current?.click()}
          className='w-40 h-40 mb-8 border-2 rounded-full cursor-pointer hover:border-gray-600'
          src={user.photo}
          alt=''
        />
        <input
          onChange={(event) => handlePhoto(event)}
          className='hidden'
          ref={fileInput}
          type='file'
          name=''
          id=''
        />
        <Timeline updateUsername={updateUsername} user={user} tweets={tweets} />
      </div>
      <div className='flex flex-col items-start w-2/6 space-y-4 h-5/6'>
        <h1 className='flex items-center justify-center px-8 space-x-4 text-4xl font-bold'>
          <span>
            {user.firstName} {user.lastName}
          </span>
          <svg
            onClick={updateName}
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
        <UserInfo
          updateDescription={updateDescription}
          updateTitle={updateTitle}
          user={user}
        />
      </div>
    </div>
  );
};

export default Portfolio;
