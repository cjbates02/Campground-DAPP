const { ethers } = require("hardhat")

const main = async () => {
    const campgroundFactory = await ethers.getContractFactory("Campground");
    const campground = await campgroundFactory.deploy();

    await campground.deployed();
    console.log(`Contract Address: ${campground.address}`)

    // book a campsite
    const bookTxn = await campground.guestCheckin('Christian', 7, {value: ethers.utils.parseEther("0.01")});
    await bookTxn.wait();

    console.log('Booking Reciept:\n',bookTxn)

    // view site status
    console.log('Site Status of Campsite 7 (false: occupied, true: vacant)', await campground.viewCampgroundStatus(7))

    // view all campsites
    console.log('Campsites:\n',await campground.getAllSites());
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
