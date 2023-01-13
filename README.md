Decentralized Booking System for Campsites

This project is a decentralized booking system for campsites using the Ethereum blockchain. It utilizes the React JavaScript library for the frontend, and the Ethers.js library for interacting with the Ethereum network. The project also utilizes MetaMask as a web3 provider to connect to the Ethereum network.

To use the system, users must first connect their wallet using the connectWallet function. Once connected, they can then check the availability of a campsite by submitting the campsite number and calling the campsiteStatus function. If the campsite is available, they can then book the campsite by calling the bookSite function and providing the required information, including their name and the campsite number they wish to book.

The smart contract used in this project is deployed at the contractAddress specified in the code, and its ABI (Application Binary Interface) is imported from the Campground.json file. The smart contract has functions for checking the status of a campsite, as well as for booking and checking in/out of a campsite.

The user interface also includes a loading spinner, using the ClipLoader component from the react-spinners library, to indicate when a transaction is being mined on the Ethereum network.

Overall, this project demonstrates the potential for using blockchain technology in creating decentralized and secure booking systems for various industries.
