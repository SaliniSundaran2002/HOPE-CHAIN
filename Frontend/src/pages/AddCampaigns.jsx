import React, { useState } from 'react'
import ABI from '../assets/donation.json'
import address from '../assets/deployed_addresses.json'
import {ethers} from 'ethers'

const AddCampaigns = () => {

        const [formData, setFormdata] = useState({
            name:'',
            targetAmount:'',
        })

        async function handleSubmit(e) {
            e.preventDefault();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const cAbi = ABI.abi
            const cAddress = address['DonationModule#Donation'];           
            const instance = new ethers.Contract(cAddress,cAbi,signer);
            // console.log("ethers", ethers);
            
            const txReceipt = await instance.createCampaign(formData.name,formData.targetAmount);
            // console.log("receipt", txReceipt);   
        }

        async function handleChange(event) {
            const {name, value} = event.target;
            setFormdata((prevState)=>({...prevState, [name]:value}));
            // console.log(formData);
            
            
            
        }
        
  return (
    <div>AddCampaigns
        <div className='item-center '>
            <form onSubmit={handleSubmit}>
                <div>Name:
                    <input type="text" name='name' id='name' className='p-4 border border-black' placeholder='Enter your name' onChange={handleChange} />
                </div>
                <div>Target Amount:
                    <input type="text" name='targetAmount' id='targetAmount' className='p-4 border border-black' placeholder='Amount in wei' onChange={handleChange} />
                </div>
                <button type='submit' className='bg-green-500 p-4 justify-center text-white rounded-lg'>Add Camapign</button>
            </form>

        </div>
    </div>
  )
}

export default AddCampaigns