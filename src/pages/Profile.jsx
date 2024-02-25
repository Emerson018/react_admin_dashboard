import React from 'react';

const ProfilePage = () => {
  return (
    <div className="chart-layout dark:bg-secondary-dark-bg">
      <div className="flex items-center justify-center">
        <img
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
          src="https://via.placeholder.com/150"
          alt="User profile"
        />
      </div>
      <div className="mt-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold">Sayrix Viçosa</h1>
        <p className="text-gray-600 mt-2">Software Developer</p>
        <p className="text-gray-600 mt-2">Location: Porto Alegre, RS</p>
        <p className="text-gray-600 mt-2">Email: sayrix.018@gmail.com</p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg md:text-xl font-bold">Bio:</h2>
        <p className="text-gray-600 mt-2">
          coé man
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
