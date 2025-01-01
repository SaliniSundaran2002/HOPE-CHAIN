import React from 'react'
import {Link} from 'react-router-dom'
import {ethers} from 'ethers'

const Header = () => {
    async function connectMetamask() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        alert(`${signer.address} is successfully logged in `);
    }
  return (
    <div className='flex justify-between mt-8 '>
        <button onClick={connectMetamask} className='bg-blue-500 p-4 justify-center text-white rounded-lg'>Connect Metamask</button>
        <Link to='add' className='bg-green-500 p-4 justify-center text-white rounded-lg'>Add Camapign</Link>
        <Link to='view' className='bg-yellow-500 p-4 justify-center text-white rounded-lg'>View Camapign</Link>
    </div>
  )
}

export default Header