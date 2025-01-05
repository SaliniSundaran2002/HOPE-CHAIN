import React from 'react'
import address from '../assets/deployed_addresses.json'
import ABI from '../assets/Donation.json'
import {ethers} from 'ethers'
const WithdrawFunds = () => {
const withdrawFund = async  () =>{
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const Address = address['DonationModule#Donation'];
  const withdrawInstance = new ethers.Contract(Address, ABI.abi, signer);
  const txReceipt = await withdrawInstance.withdrawFunds();
  console.log("txReceipt",txReceipt);
  
  console.log("campaignId", campaignId);
  

}
  return (
<div className="flex items-center justify-center h-screen">
  <button onClick={withdrawFund} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    Withdraw All Funds
  </button>
</div>

  )
}

export default WithdrawFunds