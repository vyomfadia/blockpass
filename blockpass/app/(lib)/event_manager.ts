"use client";

import EventsAbi from "@/app/(lib)/contracts/abi/events.json";
import EventFactoryAbi from "@/app/(lib)/contracts/abi/creator.json";

import {ethers} from "ethers";

const eventCreatorContractAddress = "0x70c636254700Ff64C14b130D91455E23E76FAf3E"

export async function listAllEvents() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(eventCreatorContractAddress, EventFactoryAbi, provider);

    const events = await contract.listAllEvents();
    if (!events) {
        return [];
    }

    let out = [];
    for (let i = 0; i < events.length; i++) {
        const eventContract = new ethers.Contract(events[i], EventsAbi, provider);
        const location = await eventContract.location();
        const date = await eventContract.date();
        const price = await eventContract.price();
        const remainingTickets = await eventContract.remainingTickets();
        const name = await eventContract.name();
        const symbol = await eventContract.symbol();
        const eventThumbnail = await eventContract.eventThumbnail();
        out.push({location, date, price, remainingTickets, name, symbol, eventThumbnail, contractId: events[i]});
    }

    return out;
}
