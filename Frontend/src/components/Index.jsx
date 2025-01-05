import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ethers} from 'ethers'
import { toast } from 'react-toastify'

const Index = () => {
    const navigate = useNavigate();
    
    async function connectMetamask() {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    toast.success(`${signer.address} is successfully logged in `);
    navigate('/home')
}

return (
<div className='flex justify-between mt-8 '>
    <button onClick={connectMetamask} className='bg-blue-500 p-4 justify-center text-white rounded-lg'>Connect Metamask </button>
    </div>
)
}

export default Index