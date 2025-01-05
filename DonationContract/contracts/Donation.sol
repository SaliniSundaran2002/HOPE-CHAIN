// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Donation {
    struct DonationRecord {
        address donor;
        string donationName;
        uint256 amount;
        string donorName;
    }

    struct Campaign {
        string name;
        uint256 targetAmount;
        uint256 fundsRaised;
        bool active;
        bool fundsWithdrawn; // New status to track if funds have been withdrawn
    }

    address public admin = 0xcB1510331F43409C66bbBe97A602CAaC146D7536; 

    Campaign[] public campaigns; 
    DonationRecord[] public donations; 
    
    event CampaignCreated(uint256 indexed campaignId, string name, uint256 targetAmount);
    event DonationMade(address indexed donor, uint256 indexed campaignId, uint256 amount , string donorName);
    event CampaignClosed(uint256 indexed campaignId, string reason);
    event FundsWithdrawn(address indexed admin, uint256 amount, uint256 campaignId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; 
    }

    function createCampaign(string memory _name, uint256 _targetAmount) external onlyAdmin {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        campaigns.push(Campaign(_name, _targetAmount, 0, true, false)); // Initialize fundsWithdrawn as false
        uint256 campaignId = campaigns.length - 1;

        emit CampaignCreated(campaignId, _name, _targetAmount);
    }

    function donate(uint256 _campaignId, string memory _donationName, string memory _donorName) external payable {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is not active");
        require(msg.value > 0, "Donation amount must be greater than 0");

        campaign.fundsRaised += msg.value;
        donations.push(DonationRecord(msg.sender, _donationName, msg.value, _donorName));

        emit DonationMade(msg.sender, _campaignId, msg.value, _donorName);

        if (campaign.fundsRaised >= campaign.targetAmount) {
            campaign.active = false;
            emit CampaignClosed(_campaignId, "Target amount achieved");
        }
    }

    function closeCampaign(uint256 _campaignId) external onlyAdmin {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is already closed");

        campaign.active = false;
        emit CampaignClosed(_campaignId, "Closed manually by admin");
    }

    function getAllDonations() external view returns (DonationRecord[] memory) {
        return donations;
    }

    function withdrawFunds() external onlyAdmin {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(admin).transfer(address(this).balance);
    }

    function getCampaignCount() external view returns (uint256) {
        return campaigns.length;
    }

    function getAllCampaigns() external view returns (Campaign[] memory) {
        return campaigns;
    }

    // Function to withdraw individual campaign funds by admin
    function withdrawCampaignFunds(uint256 _campaignId) external onlyAdmin {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.fundsRaised > 0, "No funds to withdraw for this campaign");
        require(!campaign.fundsWithdrawn, "Funds already withdrawn for this campaign");

        uint256 fundsToWithdraw = campaign.fundsRaised;
        campaign.fundsRaised = 0; // Reset funds after withdrawal
        campaign.fundsWithdrawn = true; // Mark funds as withdrawn

        payable(admin).transfer(fundsToWithdraw);
        emit FundsWithdrawn(admin, fundsToWithdraw, _campaignId); // Campaign specific withdrawal event
    }

    // Function to check if funds were withdrawn for a specific campaign
    function getCampaignWithdrawStatus(uint256 _campaignId) external view returns (bool) {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        return campaigns[_campaignId].fundsWithdrawn;
    }
}
