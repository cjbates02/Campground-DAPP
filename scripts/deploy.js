const { ethers } = require("hardhat")

const main = async () => {
    const [deployer] = await ethers.getSigners();
    const campgroundFactory = await ethers.getContractFactory("Campground");
    const campground = await campgroundFactory.deploy();

    await campground.deployed();
    console.log(`Contract Address: ${campground.address}`)
}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();

