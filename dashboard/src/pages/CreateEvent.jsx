import React from "react";
import { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ticketData } from "../data/dummy";
import { Header } from "../components";

const CreateEvent = () => {
  const [artist, setArtist] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [ticket, setTicket] = useState(null);

  const handleCreateTicket = () => {
    const newTicket = {
      artist,
      event,
      date,
      price
    };
    setTicket(newTicket);
    setArtist('');
    setEvent('');
    setDate('');
    setPrice('');
  };
  // document.getElementById('date').value = '';

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Create Event" />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artist">
          Artist Name
        </label>
        <input
          type="text"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event">
          Event Name
        </label>
        <input
          type="text"
          id="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Event Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Ticket Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleCreateTicket}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Ticket
      </button>

      {ticket && (
        <div className="mt-10 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Ticket Created</h2>
          <p><strong>Artist:</strong> {ticket.artist}</p>
          <p><strong>Event:</strong> {ticket.event}</p>
          <p><strong>Date:</strong> {ticket.date}</p>
          <p><strong>Price:</strong> ${ticket.price}</p>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
