"use client";

import {useEffect, useLayoutEffect, useState} from "react";
import {listAllEvents} from "@/app/(lib)/event_manager";
import NavigationBar from "../(components)/NavigationBar";
import {getTickets} from "@/app/(lib)/database/ticket_manager";
import {ethers} from "ethers";
import EventCard from "../(components)/EventCard";

function EventBox({event}) {
    return (
        <div className="w-full rounded-lg border p-2">
            <p className="text-[24px]">{event.name}</p>
        </div>
    );
}

export default function Login() {
    const [events, setEvents] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [tickets, setTickets] = useState([]);


    useEffect(() => {
        const provider = new ethers.BrowserProvider((window as any).ethereum);

        void provider.getSigner().then((signer) => {
            void getTickets(signer.address).then((tickets) => {
                setTransactions(tickets)
            });
        });
    }, []);

    useEffect(() => {
        listAllEvents().then((events) => {
            let userTix = []
            transactions.forEach((bought) => {
                events.forEach((ticket) => {
                    if (ticket.contractId === bought.eventId){
                        userTix.push(ticket)
                    }
                })
            })

            setTickets(userTix)
        });
    }, [transactions])

    return (
        <main className="py-7 h-full overflow-hidden">
            <NavigationBar/>
            <div className="!text-gray">
          <h1 className="text-5xl font-black my-8 mx-20">My Tickets</h1>

          <div className="w-full py-4 mx-auto p-2 overflow-x-scroll no-scrollbar snap-x snap-mandatory pb-10 flex flex-col justify-center gradient-scroll">
            <div className="grid auto-cols-auto gap-8 grid-flow-col no-scrollbar overflow-auto whitespace-nowrap px-10 -mx-40">
              <div className="h-4 p-20"></div>
              {tickets.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </div>
        </div>
        </main>
    );
}
