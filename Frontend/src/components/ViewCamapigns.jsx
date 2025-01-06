import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ABI from '../assets/Donation.json';
import address from '../assets/deployed_addresses.json';
import { toast } from 'react-toastify';
import Header from './Header';

const ViewCampaigns = () => {
    const [output, setOutput] = useState([]);
    const [loading, setLoading] = useState(true);
    const [donationInfo, setDonationInfo] = useState([]);
    const [error, setError] = useState('');
    const [withdrawStatus, setWithdrawStatus] = useState({}); // Track withdrawal status for each campaign

    useEffect(() => {
        const viewCampaigns = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const cAddress = address['DonationModule#Donation'];
                const cAbi = ABI.abi;
                const instance = new ethers.Contract(cAddress, cAbi, signer);
                const campaigns = await instance.getAllCampaigns();
                setOutput(campaigns);
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch campaigns. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        viewCampaigns();
    }, []);

    const handleDonate = (index) => {
        const newDonationInfo = [...donationInfo];
        newDonationInfo[index] = {
            donorName: '',
            donationAmount: '',
        };
        setDonationInfo(newDonationInfo);
    };

    const handleInputChange = (index, field, value) => {
        const newDonationInfo = [...donationInfo];
        newDonationInfo[index] = {
            ...newDonationInfo[index],
            [field]: value,
        };
        setDonationInfo(newDonationInfo);
    };

    const handleSubmitDonation = async (index) => {
        try {
            setError('');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractAddress = address['DonationModule#Donation'];
            const contractABI = ABI.abi;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const campaigns = await contract.getAllCampaigns();

            const campaignId = index;
            const donationName = campaigns[index].name;
            const donorName = donationInfo[index].donorName.trim();
            const donationAmount = donationInfo[index].donationAmount.trim();

            if (!donorName || !donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
                setError('Please enter valid details (donor name and donation amount).');
                return;
            }

            const donationAmountInWei = ethers.parseEther(donationAmount);
            const tx = await contract.donate(campaignId, donationName, donorName, {
                value: donationAmountInWei,
            });

            await tx.wait();

            toast.success(`Donation of ${donationAmount} ETH by ${donorName} successful!`);
            const newDonationInfo = [...donationInfo];
            newDonationInfo[index] = {
                donorName: '',
                donationAmount: '',
            };
            setDonationInfo(newDonationInfo);
        } catch (err) {
            console.error("Error during donation:", err);
            toast.error('Donation failed. Please try again.');
        }
    };

    const withdraw = async (index) => {
        try {
            setError('');
            setWithdrawStatus((prevState) => ({
                ...prevState,
                [index]: 'Withdrawing...', // Set status to "Withdrawing..." when the withdrawal starts
            }));

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractAddress = address['DonationModule#Donation'];
            const contractABI = ABI.abi;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const campaigns = await contract.getAllCampaigns();
            const campaignId = index;

            const campaignDetails = campaigns[campaignId];
            if (!campaignDetails) {
                throw new Error(`Campaign with ID ${campaignId} not found.`);
            }

            const fundsRaised = ethers.formatEther(campaignDetails.fundsRaised);
            if (parseFloat(fundsRaised) === 0) {
                throw new Error(`No funds available to withdraw .`);
            }

            const tx = await contract.withdrawCampaignFunds(campaignId);
            await tx.wait();

            setWithdrawStatus((prevState) => ({
                ...prevState,
                [index]: 'Funds withdrawn successfully!', // Update status on success
            }));
            toast.success(`Funds withdrawn successfully for campaign ${campaignId}`);
        } catch (err) {
            console.error("Error during withdrawal:", err);
            const errorMessage = err.reason || err.message || 'Withdrawal failed. Please try again.';
            setWithdrawStatus((prevState) => ({
                ...prevState,
                [index]: errorMessage, // Update status with error message
            }));
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <Header />
            <div className="px-4 sm:px-6 lg:px-8 py-6  min-h-screen font-SourGummy">
                <h2 className="text-3xl font-bold text-center mt-4 ">View Campaigns</h2>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <div className="mt-6 space-y-6">
                    {output.length > 0 ? (
                        output.map((campaign, index) => {
                            const targetAmount = campaign.targetAmount;
                            const fundsRaised = campaign.fundsRaised;
                            const progress = parseFloat(targetAmount) > 0
                                ? (parseFloat(fundsRaised) / parseFloat(targetAmount)) * 100
                                : 0;

                            return (
                                <div key={index} className=" p-6 rounded-lg shadow-md space-y-4 " style={{ boxShadow: '0px 5px 15px rgba(37,99,235, 0.5)' }}>
                                    <p className="text-lg font-semibold text-blue-600"><strong>Donation Name:</strong> {campaign.name}</p>
                                    <p className="text-sm text-gray-900"><strong>Target Amount:</strong> {parseInt(targetAmount)} Wei</p>
                                    <p className="text-sm text-gray-900"><strong>Funds Raised:</strong> {parseInt(fundsRaised)} Wei</p>

                                    <p className="text-sm text-gray-9900">
                                        <strong>Balance Amount:</strong>
                                        {parseInt(targetAmount) - parseInt(fundsRaised)} Wei
                                    </p>

                                    <p className={`text-sm font-semibold ${campaign.active ? 'text-green-500' : 'text-red-500'}`}>
                                        <strong>Status:</strong> {campaign.active ? 'Active' : 'Closed'}
                                    </p>

                                    <div className="mt-2">
                                        <div className="font-semibold text-white">Progress:</div>
                                        <div className="h-2 w-full bg-gray-300 rounded-full">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                    backgroundColor: progress >= 100 ? 'red' : 'green',
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-center text-white mt-2">{Math.round(progress)}%</p>
                                    </div>

                                    <div className="flex flex-wrap justify-between mt-2">
                                        <button
                                            onClick={() => handleDonate(index)}
                                            className="bg-green-500 p-3 rounded-lg text-white hover:bg-green-400 w-full sm:w-auto mt-2"
                                        >
                                            Donate
                                        </button>
                                        <button
                                            onClick={() => withdraw(index)}
                                            className="bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400 w-full sm:w-auto mt-2"
                                        >
                                            Withdraw
                                        </button>
                                    </div>

                                    {withdrawStatus[index] && (
                                        <p className="text-center text-sm text-gray-300 mt-2">{withdrawStatus[index]}</p>
                                    )}

                                    {donationInfo[index] && (
                                        <div className="mt-4 space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Donor Name"
                                                value={donationInfo[index].donorName}
                                                onChange={(e) => handleInputChange(index, 'donorName', e.target.value)}
                                                className="border border-blue-500 p-3 w-full rounded-lg  text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Amount in ETH"
                                                value={donationInfo[index].donationAmount}
                                                onChange={(e) => handleInputChange(index, 'donationAmount', e.target.value)}
                                                className="border border-blue-500 p-3 w-full rounded-lg  text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={() => handleSubmitDonation(index)}
                                                className="bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400 w-full"
                                            >
                                                Submit Donation
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : loading ? (
                        <p className="text-center text-gray-500">Loading campaigns...</p>
                    ) : (
                        <p className="text-center text-gray-500">No campaigns found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewCampaigns





