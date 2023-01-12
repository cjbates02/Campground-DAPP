// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

// the purpose of this smart contract is to serve as a decentralized booking system to be used at a campground.
// for purposes of program there are 10 campsites availible.
// future improvements may be to make number of campsites dynamic with the ability to update by owner of contract.

contract Campground {
    
    // defining the owners address and making it payable
    address payable public owner;

    // define a struct to utilize in mapping for campsites
    struct Campsite {
        uint256 campsiteNumber;
        bool status;
        address attendeeAddress;
    }

    // define struct containing attributes of a customer
    struct Customer {
        string guestName;
        address attendant;
        uint256 campsiteNumber;
    }
    
    // create list of availible campsites
    mapping(address => Customer) customers;
    Campsite[] public campsiteList;

    // runs when contract is deployed to initialize campsites and owner
    constructor() {
        owner = payable(msg.sender);

        bool _status = true;
        address _sightAddress = address(0);

        for (uint256 i = 0; i < 10; i++) {
            Campsite memory newCampsite = Campsite(i, _status, _sightAddress);
            campsiteList.push(newCampsite);
        }
        
    }

    // event that emits when campsite is booked or availible
    event book(address _customer, uint256 amount);
    event checkout(address _customer);

    // defines how much transaction will cost
    modifier cost(uint256 _amount) {
        require(msg.value >= _amount, "Not enough ether.");
        _;
    }

    // checks to make sure campsite is availible
    modifier onlyIfAvailible (uint256 _sightNumber) {
        require(_sightNumber <= 10, "Please pick from sites 1 through 10.");
        _sightNumber -= 1;
        require(campsiteList[_sightNumber].status,"This site is not availible.");
        _;
    }

    // verifies that the user checking is checked into the site they are attempting to check out of
    modifier checkoutVerification (uint256 _sightNumber) {
        _sightNumber -= 1;
        address occupiedAddress;
        Campsite memory occupiedSite = campsiteList[_sightNumber];
        occupiedAddress = occupiedSite.attendeeAddress;
        require(msg.sender == occupiedAddress, "You did not check into this site.");
        _;
    }

    // check in function
    function guestCheckin(string memory _guestName, uint256 _sightNumber) public payable cost(0.01 ether) onlyIfAvailible(_sightNumber) {
        _sightNumber -= 1;

        Customer memory newAttendee = Customer(_guestName,msg.sender, _sightNumber);
        customers[msg.sender] = newAttendee;

        campsiteList[_sightNumber].status = false;
        campsiteList[_sightNumber].attendeeAddress = msg.sender;

        (bool sent, bytes memory data) = owner.call{value: msg.value}("");
        require(true, "Transaction failed to send.");

        emit book(msg.sender, msg.value);
    }
    
    // function to chechout of campsite
    function guestCheckout(uint256 _sightNumber) public checkoutVerification(_sightNumber) {
        _sightNumber -= 1;
        campsiteList[_sightNumber].status = true;

        emit checkout(msg.sender);
    }

    // function that views campsite status
    function viewCampgroundStatus(uint256 _sightNumber) public view returns(bool) {
        _sightNumber -= 1;
        return campsiteList[_sightNumber].status;
    }

    // returns length of campsite list 
    function getListLength() public view returns(uint256) {
        uint256 len = campsiteList.length;
        return len;
    }

    // returns campsites
    function getAllSites() public view returns(Campsite[] memory) {
        return campsiteList;
    }
}