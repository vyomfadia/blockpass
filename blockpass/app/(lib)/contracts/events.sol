// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventFactory {
	Event[] public events;

	mapping(address => uint) addressToIndex;

	function releaseNewEvent(uint64 _ticketCount, uint64 _pricing, uint64 _date, string memory _location, string memory _eventThumbnail, string memory _eventName, string memory _eventSymbol) external returns (address newEvent) {
		Event e = new Event(msg.sender, _ticketCount, _pricing, _date, _location, _eventThumbnail, _eventName, _eventSymbol);

		events.push(e);
		addressToIndex[address(e)] = events.length - 1;
		return address(e);
	}

	function getEventCount() public view returns (uint) {
		return events.length;
	}

	function listAllEvents() external view returns (Event[] memory _events) {
		_events = new Event[](events.length);
		for (uint i = 0; i < events.length; i++) {
			_events[i] = events[i];
		}

		return _events;
	}

	function getEvent(address e) public view returns (Event) {
		return events[addressToIndex[e]];
	}
}

contract Event is ERC721 {
	enum EventStatus {Sales, CheckIn, Complete, Cancelled}
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

	EventStatus public status;

	// The money gets sent here.
	address payable public owner;

	mapping(uint => address) ticketToBuyerMapping;

	Ticket[] public tickets;

	event CreateTicket(address buyer, address eventId, uint ticketID);

	constructor(address _owner, uint _ticketCount, uint _price, uint64 _date, string memory _location, string memory _eventThumbnail, string memory _eventName, string memory _eventSymbol) ERC721(_eventName, _eventSymbol) {
		bytes memory eventNameBytes = bytes(_eventName);
		bytes memory eventSymbolBytes = bytes(_eventSymbol);
		require(eventNameBytes.length != 0, "event name");
		require(eventSymbolBytes.length != 0, "event symbol");

		location = _location;
		date = _date;
		price = _price;
		remainingTickets = _ticketCount;
		eventThumbnail = _eventThumbnail;

		owner = payable(_owner);
	}

	function buyTicket() public payable returns (uint) {
		require(remainingTickets > 0, "no remaining tickets");
		require(msg.value >= price, "no moneys");
		require(status == EventStatus.Sales, "cannot buy tickets outside of sales period");

		tickets.push(Ticket(price, TicketStatus.Valid));
		uint ticketID = tickets.length - 1;
		remainingTickets--;

		ticketToBuyerMapping[ticketID] = msg.sender;

		_safeMint(msg.sender, ticketID);
		emit CreateTicket(msg.sender, address(this), ticketID);

		return ticketID;
	}

	function refundTicket(uint _ticketID) public {
		require(ownerOf(_ticketID) == msg.sender, "not your ticket");
		require(tickets[_ticketID].status == TicketStatus.Valid, "ticket not valid");
		require(status == EventStatus.Sales, "cannot refund tickets outside of sales period");

		tickets[_ticketID].status = TicketStatus.Refunded;
		remainingTickets++;
		_burn(_ticketID);

		bool sent = payable(ticketToBuyerMapping[_ticketID]).send(tickets[_ticketID].salePrice);
		require(sent);
	}

	function payoutOwner() public {
		require(msg.sender == owner, "not the owner");
		require(status == EventStatus.Complete, "event not complete");

		bool sent = owner.send(address(this).balance);
		require(sent);
	}

	function cancelEvent() public {
		require(msg.sender == owner, "not the owner");
		require(status == EventStatus.Sales, "event not in sales period");

		status = EventStatus.Cancelled;
		for (uint i = 0; i < tickets.length; i++) {
			if (tickets[i].status == TicketStatus.Valid) {
				tickets[i].status = TicketStatus.Refunded;
				remainingTickets++;

				_burn(i);

				bool sent = payable(ticketToBuyerMapping[i]).send(tickets[i].salePrice);
				require(sent);
			}
		}
	}

	function completeEvent() public {
		require(msg.sender == owner, "not the owner");
		require(status == EventStatus.CheckIn, "event not in check-in period");

		status = EventStatus.Complete;
	}

	function getTicket(uint ticketId) public view returns (Ticket memory) {
		return tickets[ticketId];
	}
}
