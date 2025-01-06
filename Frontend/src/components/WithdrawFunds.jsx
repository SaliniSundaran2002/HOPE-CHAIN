import React from 'react'
import address from '../assets/deployed_addresses.json'
import ABI from '../assets/Donation.json'
import {ethers} from 'ethers'
import Header from './Header'
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
    <div>
      <Header/>
<div className="flex items-center justify-center h-screen font-SourGummy">
  <button onClick={withdrawFund} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    Withdraw All Funds
  </button>
</div>
</div>

  )
}

export default WithdrawFunds