const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation Contract", function () {
    let Donation;
    let donation;
    let admin, donor;

    beforeEach(async function () {
        [admin, donor] = await ethers.getSigners();
        const DonationFactory = await ethers.getContractFactory("Donation");
        donation = await DonationFactory.deploy();
        await donation.deployed();
    });

    it("Should set the admin correctly", async function () {
        expect(await donation.admin()).to.equal(admin.address);
    });

    it("Should allow admin to create a campaign", async function () {
        await donation.createCampaign("Help Children", ethers.utils.parseEther("10"));
        const campaign = await donation.campaigns(0);
        expect(campaign.name).to.equal("Help Children");
        expect(campaign.targetAmount).to.equal(ethers.utils.parseEther("10"));
        expect(campaign.active).to.equal(true);
    });

    it("Should allow donations to an active campaign", async function () {
        await donation.createCampaign("Help Children", ethers.utils.parseEther("10"));
        await donation.connect(donor).donate(0, "Donation for Children", {
            value: ethers.utils.parseEther("1"),
        });
        const campaign = await donation.campaigns(0);
        expect(campaign.fundsRaised).to.equal(ethers.utils.parseEther("1"));
    });

    it("Should close the campaign when target is reached", async function () {
        await donation.createCampaign("Help Children", ethers.utils.parseEther("1"));
        await donation.connect(donor).donate(0, "Donation for Children", {
            value: ethers.utils.parseEther("1"),
        });
        const campaign = await donation.campaigns(0);
        expect(campaign.active).to.equal(false);
    });

    it("Should allow admin to withdraw funds", async function () {
        await donation.createCampaign("Help Children", ethers.utils.parseEther("10"));
        await donation.connect(donor).donate(0, "Donation for Children", {
            value: ethers.utils.parseEther("5"),
        });

        const initialBalance = await ethers.provider.getBalance(admin.address);
        await donation.withdrawFunds();
        const finalBalance = await ethers.provider.getBalance(admin.address);
        expect(finalBalance).to.be.gt(initialBalance);
    });

    it("should allow only admin to withdraw funds", async function () {
        // Add campaign, raise funds, etc.
        // Ensure that only the admin can call the withdraw function
        await expect(contract.connect(nonAdmin).withdrawCampaignFunds(0))
            .to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow withdrawal if funds are already withdrawn", async function () {
        // Call withdraw once
        await contract.connect(admin).withdrawCampaignFunds(0);
        
        // Attempt to withdraw again
        await expect(contract.connect(admin).withdrawCampaignFunds(0))
            .to.be.revertedWith("Funds already withdrawn for this campaign");
    });

    it("should withdraw funds correctly", async function () {
        const initialBalance = await ethers.provider.getBalance(admin);

        // Assuming campaign with ID 0 exists and has funds
        await contract.connect(admin).withdrawCampaignFunds(0);

        const finalBalance = await ethers.provider.getBalance(admin);
        const fundsToWithdraw = ethers.utils.parseEther("10"); // Example amount

        // Verify that the admin's balance has increased by the withdrawn amount
        expect(finalBalance.sub(initialBalance)).to.equal(fundsToWithdraw);
    });
});
