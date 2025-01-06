import React, { useEffect, useState } from 'react';
import ABI from '../assets/Donation.json';
import Address from '../assets/deployed_addresses.json';
import { ethers } from 'ethers';
import Header from './Header';

const AllDonations = () => {
    const [output, setOutput] = useState([]);
    
    useEffect(() => {
        const allDonations = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = Address['DonationModule#Donation']; 
            const instance = new ethers.Contract(address, ABI.abi, signer);
            
            try {
                const txReceipt = await instance.getAllDonations();
                setOutput(txReceipt);
            } catch (error) {
                console.error("Error fetching donations:", error);
            }
        };
        
        allDonations();
    }, []);
    
    return (
        <div>
            <Header/>
        <div className=" min-h-screen py-6 px-4 sm:px-6 md:px-8 font-SourGummy">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-900 mb-8">All Donations</h1>

            {output.length > 0 ? (
                output.map((donation, index) => {
                    return (
                        <div key={index} className="border border-blue-500 p-4 sm:p-6 rounded-lg shadow-lg mb-4">
                            <p className="text-base sm:text-lg font-semibold text-blue-600">
                                <strong>Donor:</strong> {donation.donor}
                            </p>
                            <p className="text-base sm:text-lg font-semibold text-blue-400">
                                <strong>Donor Name:</strong> {donation.donorName}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-900">
                                <strong>Donation Name:</strong> {donation.donationName}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-900">
                                <strong>Amount Donated:</strong> {parseInt(donation.amount)} Wei
                            </p>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-400">No donations available</p>
            )}
        </div>
        </div>
    );
};

export default AllDonations;