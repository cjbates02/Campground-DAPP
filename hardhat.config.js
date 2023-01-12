require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const INFURA_API_KEY = '8aca59d070f04834a4a09b20effc0fb3'
const GOERLI_PRIVATE_KEY = 'bbb234edf1ef093fb244ded1d7eab102e2997f1adaa683eec233c72189c74d00'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: { 
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [proccess.env.GOERLI_PRIVATE_KEY]
    }
  }
};
