# Decentralized Booking System for Campsites

This project is a decentralized booking system for campsites built on the Ethereum blockchain. It utilizes the React JavaScript library for the frontend and the Ethers.js library for interacting with the Ethereum network, with MetaMask serving as the web3 provider.

## Features

- **Wallet Connection**: Users can connect their wallet using the `connectWallet` function.
- **Campsite Availability**: Check the availability of a campsite by submitting the campsite number through the `campsiteStatus` function.
- **Booking Process**: If available, users can book a campsite by calling the `bookSite` function and providing their name and the desired campsite number.

## Smart Contract

The smart contract is deployed at the specified `contractAddress` and its ABI (Application Binary Interface) is imported from the `Campground.json` file. The contract includes functions for:

- Checking campsite status
- Booking a campsite
- Checking in/out of a campsite

## User Interface

The interface features a loading spinner, implemented with the `ClipLoader` component from the `react-spinners` library, to indicate when a transaction is being mined on the Ethereum network.

## Conclusion

This project showcases the potential of blockchain technology in creating decentralized and secure booking systems for various industries.
