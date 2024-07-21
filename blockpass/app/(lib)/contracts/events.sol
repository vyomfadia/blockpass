// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventFactory {
    Event[] public events;

    function releaseNewEvent(uint64 _ticketCount, uint64 _pricing, uint64 _date, string memory _location, string memory _eventName, string memory _eventSymbol)  external returns (address newEvent) {
        Event e = new Event(msg.sender, _ticketCount, _pricing, _date, _location, _eventName, _eventSymbol);

        events.push(e);
        return address(e);
    }

    function getEventCount() public view returns (uint) {
        return events.length;
    }

    function listAllEvents() external view returns(Event[] memory _events) {
        _events = new Event[] (events.length);
        for (uint i=0; i<events.length; i++){
            _events[i] = events[i];
        }

        return _events;
    }
}

contract Event is ERC721 {
    enum TicketStatus {Valid, Used, Refunded}
    struct Ticket {
        uint salePrice;
        TicketStatus status;
    }

    string public location;
    uint64 public date;
    uint   public price;
    uint   public remainingTickets;
    string public eventThumbnail;

    // The money gets sent here.
    address payable public owner;

    Ticket[] public tickets;

    event CreateTicket(address buyer, address eventId, uint ticketID);

    constructor(address _owner, uint _ticketCount, uint _price, uint64 _date, string memory _location, string memory _eventName, string memory _eventSymbol) ERC721(_eventName, _eventSymbol) {
        bytes memory eventNameBytes = bytes(_eventName);
        bytes memory eventSymbolBytes = bytes(_eventSymbol);
        require(eventNameBytes.length != 0, "event name");
        require(eventSymbolBytes.length != 0, "event symbol");

        location = _location;
        date = _date;
        price = _price;
        remainingTickets = _ticketCount;

        owner = payable(_owner);
    }

    function buyTicket() public payable returns (uint) {
        require(remainingTickets > 0, "no remaining tickets");
        require(msg.value >= price, "no moneys");

        tickets.push(Ticket(price, TicketStatus.Valid));
        uint ticketID = tickets.length - 1;
        remainingTickets--;


        bool sent = owner.send(msg.value);
        require(sent, "transaction failed");

        _safeMint(msg.sender, ticketID);
        emit CreateTicket(msg.sender, address(this), ticketID);

        return ticketID;
    }

//    function refundTicket(uint _ticketID) public {
//        require(ownerOf(_ticketID) == msg.sender, "not your ticket");
//        require(tickets[_ticketID].status == TicketStatus.Valid, "ticket not valid");
//
//        tickets[_ticketID].status = TicketStatus.Refunded;
//        remainingTickets++;
//        _burn(_ticketID);
//
//        bool sent = owner.transfer(tickets[_ticketID].salePrice);
//        require(sent);
//    }
}
