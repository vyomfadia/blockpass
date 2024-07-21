"use client";

import Image from "next/image";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {listAllEvents} from "@/app/(lib)/event_manager";
import CryptoJS from 'crypto-js';
import NavigationBar from "../(components)/NavigationBar";
import {getTickets} from "@/app/(lib)/database/ticket_manager";
import {ethers} from "ethers";
import EventCard from "../(components)/EventCard";

import QRCode from 'qrcode'

function EventBox({event}) {
    return (
        <div className="w-full rounded-lg border p-2">
            <p className="text-[24px]">{event.name}</p>
        </div>
    );
}


export default function Login() {
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState<any | null>(null);
    const [transactions, setTransactions] = useState([]);
    const [tickets, setTickets] = useState([]);

    const [qrLoading, setQrLoading] = useState(false)
    const [showQr, setShowQr] = useState(false)


    const qrCanvas = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef(null);

    async function generateQR(text: string) {
        try {
          if (qrCanvas.current) {
            await QRCode.toCanvas(qrCanvas.current, text);
          }
        } catch (err) {
          console.error(err);
        }
      }
    
    function rollingQr(event){
        setShowQr(true)
        setQrLoading(true)
        generateQR(`${event?.eventId}.${event?.ticketId}.${new Date()}`)
        setQrLoading(false)
    }
  

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
            transactions.filter((bought) => {
                events.filter((ticket) => {
                    console.log(bought)
                    if (ticket.contractId === bought.eventId){
                        let newTicket = {...ticket, ...bought}
                        userTix.push(newTicket)
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
                <EventCard key={i} setEvent={setEvent} event={event} />
              ))}
            </div>
          </div>
            </div>

        <div
        className={`fixed z-10 top-0 left-0 w-full h-full duration-500 py-7 ${
          event
            ? "pointer-events-auto backdrop-blur-sm opacity-100"
            : " backdrop-blur-0 pointer-events-none opacity-0"
        }`}
        onClick={() => {setEvent(null), clearInterval(intervalRef.current), setShowQr(false) }}
      >
        <div
          className={`relative duration-500 bg-[#2c2c2c] pointer-events-auto w-[500px] h-full ml-auto mr-7 rounded-lg shadow-2xl overflow-hidden ${
            event ? "translate-x-0" : " translate-x-[120%]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* <div className="flex flex-row-reverse text-2xl py-4 font-bold cursor-pointer">
            x
          </div> */}
          {event && (
            <Image
              alt="banner"
              width={300}
              height={200}
              src={event?.eventThumbnail}
              className="w-full object-cover object-top max-h-[300px]"
            />
          )}

          <div className="p-8 grid grid-cols-[50%_50%] auto-rows-auto">
            <p className="text-3xl font-black pb-2 col-span-2">{event?.name}</p>
            <p>{`${event?.remainingTickets} Tickets Remainings`}</p>
            <p className=" font-extralight pb-4">{event?.description}</p>
            <div className="grid grid-cols-[50%_50%] col-span-2 gap-2 h-full">
              <p className="font-bold text-xl text-foreground">Location</p>
              <p
                className="font-ultralight text-foreground pb-2"
                suppressHydrationWarning
              >
                {event?.location}
              </p>
              <p className="font-bold text-xl text-foreground">Date and Time</p>
              <p
                className="font-ultralight text-foreground"
                suppressHydrationWarning
              >
                {new Date(Number(event?.date)).toLocaleDateString()}
                {", "}
                {new Date(Number(event?.date)).toLocaleTimeString()}
              </p>
              <p className="font-bold text-xl text-foreground">Price</p>
              <p>{`${event?.price} DOT`}</p>

              <button
                onClick={() => {
                    rollingQr(event)
                    intervalRef.current = setInterval(() => rollingQr(event), 3500);
                }}
                className="bg-primary absolute mx-auto left-[50%] -translate-x-2/4 bottom-5 w-[90%] py-3 mt-auto rounded-md justify-self-end"
              >
                {!qrLoading ? "Show QR Code" : "Loading"}
              </button>
            </div>

                {
                    showQr ?             <div className="pt-4 grid place-items-center w-full text-center">
                    <canvas className="mx-auto" ref={qrCanvas} />
                </div> : <></>
                }

          </div>
        </div>
      </div>
        </main>
    );
}
