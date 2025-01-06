import React from 'react';
import bg from '../assets/images/bg1.jpg';
import Header from './Header';

const HomePage = () => {
  return (
    <div>
      <Header /> {/* Ensure the Header is here */}
      
      {/* Main Content Section */}
      <div className="relative flex justify-center items-center ">
      <div
        className=" w-full w-fill h-64 p-6 shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`, // Set the background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0"></div> {/* Transparent dark overlay */}

{/* Box for the text on the left with gray background */}
<div className="relative z-10  bg-black opacity-50 p-6 rounded-lg w-1/2 ml-4">
  <h2 className="text-sm font-semibold text-white italic sm:text-xl md:text-xl font-mono text-center">
  "Together, We Build Tomorrow"


  </h2>
</div>

      </div>
    </div>
    <div className="my-12 px-6">
  <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mb-6">
  <h2 className="text-3xl font-semibold text-cyan-800 mb-4 font-SourGummy">
  Vision
</h2>

    <p className="text-lg text-gray-700 font-Lobster">
      To create a world where everyone has access to the resources they need, regardless of their background, enabling a brighter future for all through collective compassion and support.
    </p>
  </div>
  
  <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
    <h2 className="text-3xl font-semibold text-cyan-800 mb-4 text-right font-SourGummy">Mission</h2>
    <p className="text-lg text-gray-700 font-Lobster">
      Our mission is to empower communities by connecting generous donors with impactful charity campaigns. We aim to provide a seamless platform for donations, ensuring transparency, trust, and positive change for those in need. Through collaboration and technology, we strive to make charity donations simple, secure, and impactful.
    </p>
  </div>
</div>

    </div>
  );
};

export default HomePage;
