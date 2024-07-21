"use client";

import {listAllEvents} from "@/app/(lib)/event_manager";
import EventsAbi from "@/app/(lib)/contracts/abi/events.json";
import {useEffect, useState} from "react";

import { ethers } from 'ethers';

export default function BuyTicket() {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        listAllEvents().then((events) => {
            setEventList(events)
        });
    }, []);

    const buyTicket = (contractId: string, price: number) => {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const increment = async () => {
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractId, EventsAbi, signer);

            try {
                const value = await contract.buyTicket({value: ethers.parseEther(price.toString())});
                console.log(value.toString());
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
