import React, { useState } from 'react';
import ABI from '../assets/Donation.json';
import address from '../assets/deployed_addresses.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const AddCampaigns = () => {
  const [formData, setFormdata] = useState({
    name: '',
    targetAmount: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const cAbi = ABI.abi;
    const cAddress = address['DonationModule#Donation'];
    const instance = new ethers.Contract(cAddress, cAbi, signer);

      // Send transaction to create campaign
      const txReceipt = await instance.createCampaign(formData.name, formData.targetAmount);
      const receipt = await txReceipt.wait();
      // console.log("Transaction receipt:", receipt);
      if(receipt){
        toast.success("Successfully Created!")
      }
      else{
      toast.error("An error occurred while creating the campaign.")};

  }

  async function handleChange(event) {
    const { name, value } = event.target;
    setFormdata((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4 sm:p-6 md:p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Add a Campaign</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Campaign Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter campaign name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium">Target Amount (ETH):</label>
            <input
              type="text"
              name="targetAmount"
              id="targetAmount"
              className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter target amount in Wei"
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-green-500 p-4 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampaigns;
