import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ethers} from 'ethers'
import { toast } from 'react-toastify'
import video from '../assets/video/video.mp4'

const Index = () => {
    const navigate = useNavigate();
    
    async function connectMetamask() {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    toast.success(`${signer.address} is successfully logged in `);
    navigate('/home')
}

return (
<div className="relative w-full h-screen overflow-hidden">
  {/* Video Background */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src={video}
    autoPlay
    loop
    muted
  ></video>

  {/* Content */}
  <div className="absolute top-0 right-0 z-10 px-4 mt-8">
    <button
      onClick={connectMetamask}
      className="bg-blue-500 px-6 py-3 text-white rounded-lg text-lg md:text-xl hover:bg-blue-600 transition"
    >
      Connect Metamask
    </button>
  </div>
</div>




)
}

export default Index