import React from 'react';
import bg1 from '../assets/images/bg.jpg'
import bg2 from '../assets/images/bg1.jpeg'
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">

      <div className="quote-container">
        <h2 className="text-xl font-semibold text-gray-800 italic animate-rotateQuote text-center sm:text-2xl md:text-3xl">
          "The only limit to our realization of tomorrow is our doubts of today." - Franklin D. Roosevelt
        </h2>
      </div>

      {/* Sliding Images Section */}
      <div className="overflow-hidden w-full">
        <div className="flex animate-slideImages">
          <img
            src={bg1}
            alt="Image 1"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
          <img
          src={bg2}
            alt="Image 2"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
          <img
            src="https://via.placeholder.com/300/5733FF"
            alt="Image 3"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
          <img
            src="https://via.placeholder.com/300/33AFFF"
            alt="Image 4"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
          <img
            src="https://via.placeholder.com/300/FF33A2"
            alt="Image 5"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
          <img
            src="https://via.placeholder.com/300/FF9633"
            alt="Image 6"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
          <img
            src="https://via.placeholder.com/300/5733A2"
            alt="Image 7"
            className="w-auto h-auto mx-2 sm:w-48 md:w-64 lg:w-72"
          />
        </div>
      </div>

      {/* Add Tailwind Custom CSS */}
      <style jsx>{`
        
        /* Slide images animation */
        @keyframes slideImages {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-slideImages {
          animation: slideImages 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
