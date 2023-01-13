
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import Campground from './utils/Campground.json';
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentSite, setCurrentSite] = useState("")
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const contractAddress = '0x9748F6B42644D511d66d0048Fb33609A16Bef332'

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }


  const campsiteStatus = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const campgroundContract = new ethers.Contract(contractAddress, Campground.abi, signer);

    try {
      const status = await campgroundContract.viewCampgroundStatus(input);

      if (status) {
        return 'Campsite Available';
      } else {
        return 'Campsite Unavailable';
      }
    } catch (error) {
      console.log(error);
      return 'Invalid Campsite';
    }
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setResult(await campsiteStatus())
  }

  const bookSite = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const campgroundContract = new ethers.Contract(contractAddress, Campground.abi, signer);


        const campsiteNumber = prompt('Enter the site you would like to book.')
        setCurrentSite(campsiteNumber)

        const bookTxn = await campgroundContract.guestCheckin("Christian Bates", campsiteNumber, { value: ethers.utils.parseEther("0.01") });
        setLoading(true);
        console.log("Mining...", bookTxn.hash);

        await bookTxn.wait();
        setLoading(false);
        console.log("Mined --", bookTxn.hash);

        console.log("Campground Status (false = unavailable true = available)", await campgroundContract.viewCampgroundStatus(campsiteNumber));
      }
      else {
        console.log("Ethereum object does not exist.");
      }
    } catch (error) {
      console.log("Error");
    }
  }

  const checkout = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const campgroundContract = new ethers.Contract(contractAddress, Campground.abi, signer);

        const campsiteNumber = prompt("Enter the campsite number in which you would like to checkout.")
        setCurrentSite(campsiteNumber)

        const checkoutTxn = await campgroundContract.guestCheckout(campsiteNumber);
        setLoading(true);
        console.log("Mining...", checkoutTxn.hash);

        await checkoutTxn.wait();
        setLoading(false);
        console.log("Mined --", checkoutTxn.hash);

        console.log("Campground Status (false = unavailable true = available)", campgroundContract.viewCampgroundStatus(campsiteNumber));
      }
      else {
        console.log("Ethereum object does not exist.");
      }
    }
    catch (error) {
      console.log("Error");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          Welcome to my Campground!
        </div>

        <div className="bio">
          Hi my name is Christian Bates, I am currently in college studying computer security and management information systems. I am passionate about using blockchain technology to create decentralized solutions for various industries. I have experience in developing smart contracts and have a strong foundation in programming languages such as Solidity and JavaScript. In my spare time, I enjoy staying up to date with the latest developments in the blockchain space and contributing to open source projects.
        </div>
        <br />
        <div className="dataContainer">
          <form onSubmit={handleSubmit}>
            <label className="text">
              Enter a Campsite Number to Check Availability.
              <br />
              <input className="labelContainer" type="number" value={input} onChange={handleChange} />
            </label>
            <br />
            <input className="bookButton" type="submit" value="Check Availibility" />
            <br />
            <div className="bio">{result}</div>
          </form>
        </div>
        <button className="bookButton" onClick={bookSite}>Book A Campsite!</button>
        <button className="bookButton" onClick={checkout}>Checkout</button>
        {!currentAccount && (
          <button className="bookButton" onClick={connectWallet}>Connect Wallet</button>
        )}
        <br />
        <div>{loading ? <ClipLoader /> : null}</div>

      </div>
    </div>

  )
}

export default App;
