# HopeChain - Blockchain-Based Charity Donation Platform

**HopeChain** is a decentralized platform designed to facilitate transparent and secure charity donations. Powered by Ethereum blockchain, it ensures complete transparency for all transactions. With the integration of **Metamask**, the platform allows users to donate to various campaigns with full verification of funds. All donations are securely stored on the blockchain.

## Features

- **Create Campaigns:** Easily create and manage donation campaigns with a specified target amount.
- **Donation Tracking:** Make donations, track the amount, and view the progress of each campaign.
- **Metamask Integration:** Secure interaction with the blockchain via Metamask wallet integration.
- **Campaign Closure:** Automatically closes campaigns when the donation target is reached or manually by the admin.

## How it Works

1. **Create Campaigns:** Admins create donation campaigns by specifying a name, target amount, and other details.
2. **Donate to Campaigns:** Users can donate to active campaigns, and their donations are securely recorded on the blockchain.
3. **Track Progress:** Both donors and admins can monitor the funds raised in real-time.
4. **Withdraw Funds:** Admins can withdraw funds raised for each campaign once it is completed.

## Smart Contract Functions

- `createCampaign`: Allows the admin to create a new campaign with a target donation amount.
- `donate`: Allows users to donate to a specific campaign.
- `closeCampaign`: Allows the admin to manually close a campaign.
- `withdrawFunds`: Allows the admin to withdraw funds raised for the campaign.
- `getAllDonations`: Fetches all the donation records.
- `getAllCampaigns`: Fetches all the ongoing and closed campaigns.
- `withdrawCampaignFunds`: Allows the admin to withdraw funds specifically for each campaign.

## Technologies Used

- **Solidity**: For developing Ethereum smart contracts.
- **Ethereum Blockchain**: For secure, transparent transactions and campaign management.
- **Metamask**: For interacting with the blockchain and ensuring secure donations.
- **Ethers.js**: To interact with the Ethereum blockchain via the front-end.


## Setup Instructions

### Prerequisites

- Node.js
- Metamask Wallet
- Ethereum Test Network (Sepolia/Testnet for testing)
- Hardhat

### Installing

1. Clone the repository:
   ```bash
   git clone https://github.com/SaliniSundaran2002/HOPE-CHAIN.git

   cd HOPE-CHAIN

2. Install Dependencies
   ```bash
   npm install

### Testing
- Use Metamask for interacting with the dApp and testing donation flows.
- Verify that the campaign is closed once the target is reached.


### License
This project is licensed under the MIT License - see the LICENSE file for details.
