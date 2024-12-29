// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules"); //building a bundle for each modules


module.exports = buildModule("DonationModule", (m) => {

  const donate = m.contract("Donation");

  return { donate };
});
