// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Donation {
    struct DonationRecord {
        address donor;
        string donationName;
        uint256 amount;
    }

    struct Campaign {
        string name;
        uint256 targetAmount;
        uint256 fundsRaised;
        bool active;
    }
    address public admin; 

    Campaign[] public campaigns; 
    DonationRecord[] public donations; 
    event CampaignCreated(uint256 indexed campaignId, string name, uint256 targetAmount);
    event DonationMade(address indexed donor, uint256 indexed campaignId, uint256 amount);
    event CampaignClosed(uint256 indexed campaignId, string reason);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; 
    }

    function createCampaign(string memory _name, uint256 _targetAmount) external onlyAdmin {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        campaigns.push(Campaign(_name, _targetAmount, 0, true));
        uint256 campaignId = campaigns.length - 1;

        emit CampaignCreated(campaignId, _name, _targetAmount);
    }

   
    function donate(uint256 _campaignId, string memory _donationName) external payable {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is not active");
        require(msg.value > 0, "Donation amount must be greater than 0");

        campaign.fundsRaised += msg.value;

       
        donations.push(DonationRecord(msg.sender, _donationName, msg.value));

        emit DonationMade(msg.sender, _campaignId, msg.value);

       
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
    
    function getAllCampaigns() external view returns (Campaign[] memory){
        return campaigns;
    }
}
