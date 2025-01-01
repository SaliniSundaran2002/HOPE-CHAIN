import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import ABI from '../assets/donation.json'
import address from '../assets/deployed_addresses.json'

const ViewCampaigns = () => {
    const [output, setOutput] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const viewCampaigns = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const cAddress = address['DonationModule#Donation'];
                const cAbi = ABI.abi;
                const instance = new ethers.Contract(cAddress, cAbi, signer);
                // console.log("instance: ", inst);
                
                const txReceipt = await instance.getAllCampaigns();
                console.log("receipt", txReceipt);
                setOutput(txReceipt);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        viewCampaigns();
    }, []);

    if (loading) {
        return <h1 className='text-center mt-10'>Loading......</h1>
    }

    return (
        <div>
            <h2 className='text-center mt-4'>View Campaigns</h2>
            <div className='mt-4'>
                {output.length > 0 ? (
                    output.map((campaign, index) => (
                        <div key={index} className='p-4 border-b'>
                            <p><strong>Campaign Name:</strong> {campaign.name}</p>
                            <p><strong>Goal:</strong> {campaign[1].toString()} ETH</p>
                            <p><strong>Raised:</strong> {ethers.formatEther(campaign[2])} ETH</p>
                            <button className='bg-green-300 p-4 rounded-lg text-blue-500'>Donate</button>
                        </div>

                    ))
                ) : (
                    <p>No campaigns found.</p>
                )}
            </div>
        </div>
    )
}

export default ViewCampaigns;
