"use client";

import {listAllEvents} from "@/app/(lib)/event_manager";
import EventsAbi from "@/app/(lib)/contracts/abi/events.json";
import {useEffect, useState} from "react";

import { ethers } from 'ethers';
import {insertTickets} from "@/app/(lib)/database/ticket_manager";

export default function BuyTicket() {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        listAllEvents().then((events) => {
            setEventList(events)
        });
    }, []);

    const buyTicket = (contractId: string, price: number) => {
        const provider = new ethers.BrowserProvider((window as any).ethereum);

        const increment = async () => {
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractId, EventsAbi, signer);

            console.log("MONKEY");
            try {
                const value = await contract.buyTicket({value: ethers.parseEther(price.toString())});
                await contract.on("CreateTicket", (buyer, event, ticketId) => {void insertTickets(buyer, event, ticketId)});
                // await insertTickets(value.address, contractId, tokenId);
            } catch (e) {
                window.alert(e);
            }
        }

        void increment();
    }

    return (
        <div>
            <h1>Buy Ticket</h1>
            {
                eventList.map((e, i) => {
                    return (
                        <div key={i}
                             className={"min-w-[30rem] p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
                            <h2>{e.name}</h2>
                            <p>{e.location}</p>
                            <p>{e.date.toString()}</p>
                            <p>{e.price.toString()}</p>
                            <p>{e.remainingTickets.toString()}</p>
                            <p>{e.eventThumbnail.toString()}</p>
                            <div role="button" className="bg-[#000000] p-4" onClick={() => buyTicket(e.contractId, e.price)}>
                                BUY ME
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
