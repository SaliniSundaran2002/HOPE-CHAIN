import React from 'react'
import ConnectMetamask from '../components/ConnectMetamask'
import GetAllCampaigns from '../components/GetAllCampaigns'

const Homepage = () => {

    return (
        <>
            <div className="flex justify-end items-center space-x-4 p-4 bg-black">
                <ConnectMetamask />
                <GetAllCampaigns />
            </div>

            <div className="text-center py-8 text-white">
                <h1 className="text-4xl font-bold">Welcome to the <strong className='text-cyan-500'>HopeChain</strong> Charity Platform</h1>
                <p className="mt-4 text-lg">Together, we can make a difference.</p>
            </div>
        </>
   )
}

export default Homepage