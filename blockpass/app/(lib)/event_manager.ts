"use client";

import EventsAbi from "@/app/(lib)/contracts/abi/events.json";
import EventFactoryAbi from "@/app/(lib)/contracts/abi/creator.json";

import {ethers} from "ethers";

const eventCreatorContractAddress = "0xc01Ee7f10EA4aF4673cFff62710E1D7792aBa8f3"

export async function listAllEvents() {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const contract = new ethers.Contract(eventCreatorContractAddress, EventFactoryAbi, provider);

    const events = await contract.listAllEvents();
    if (!events) {
        return [];
    }

    let out = [];
    for (let i = 0; i < events.length; i++) {
        const eventContract = new ethers.Contract(events[i], EventsAbi, provider);
        out.push(await extractEventFromContract(eventContract));
    }

    return out;
}

export async function getEvent(contractId: string) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractId, EventsAbi, provider);

    return extractEventFromContract(contract);
}

async function extractEventFromContract(contract: ethers.Contract) {
    const location = await contract.location();
    const date = await contract.date();
    const price = await contract.price();
    const remainingTickets = await contract.remainingTickets();
    const name = await contract.name();
    const symbol = await contract.symbol();
    const eventThumbnail = await contract.eventThumbnail();
    return {location, date, price, remainingTickets, name, symbol, eventThumbnail, contractId: await contract.getAddress()};
}

export async function getTicketData(eventContract: string, ticketId: number) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(eventContract, EventsAbi, provider);

    const event = await extractEventFromContract(contract);
    const ticket = await contract.getTicketData(ticketId);
    return {event, ticket};
}
