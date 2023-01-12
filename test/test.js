const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Campground Contract", function () {
    async function deployCampgroundFixture() {
        const Campground = await ethers.getContractFactory("Campground");
        const [owner] = await ethers.getSigners();

        const hardhatCampground = await Campground.deploy();
        await hardhatCampground.deployed();

        return { Campground, hardhatCampground, owner };
    }

    describe("Deployment", function () {

        it("Should set owner to deployer address", async function () {
            const { hardhatCampground, owner } = await loadFixture(deployCampgroundFixture);
            expect(await hardhatCampground.owner()).to.equal(owner.address);

        })

        it("Should instantatiate 10 campsites", async function () {
            const { hardhatCampground } = await loadFixture(deployCampgroundFixture);
            expect(await hardhatCampground.getListLength()).to.equal(10);
        })
    
    })

    describe("Booking System", function () {
        it("Should make a campsite unavailable after it is booked", async function () {
            // loading campground contract in
            const { hardhatCampground } = await loadFixture(deployCampgroundFixture);

            // booking campsite number 7
            const bookedSite = await hardhatCampground.guestCheckin('Christian', 7, {value: ethers.utils.parseEther("2")});
            await bookedSite.wait();

            // checking to verify site has been booked
            expect(await hardhatCampground.viewCampgroundStatus(7)).to.equal(false);
        })
    })
})
