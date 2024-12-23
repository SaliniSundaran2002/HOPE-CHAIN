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
});
