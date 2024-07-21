import EventsAbi from "@/app/(lib)/contracts/abi/events.json";
import EventFactoryAbi from "@/app/(lib)/contracts/abi/creator.json";

import {Web3} from "web3";

const eventCreatorContractAddress = "0x527FC4060Ac7Bf9Cd19608EDEeE8f09063A16cd4"

type EventDetails = {
    location: string;
    date: number;
    price: number;
    remainingTickets: number;
    name: string;
    symbol: string;
}

export async function listAllEvents() {
    const web3 = new Web3("http://127.0.0.1:9944");
    const contractRef = new web3.eth.Contract(EventFactoryAbi, eventCreatorContractAddress);

    const events = await contractRef.methods.listAllEvents().call();
    if (!events) {
        return [];
    }

    let out = [];
    for (let i = 0; i < events.length; i++) {
        const eventContract = new web3.eth.Contract(EventsAbi, events[i]);
        const location = await eventContract.methods.location().call();
        const date = await eventContract.methods.date().call();
        const price = await eventContract.methods.price().call();
        const remainingTickets = await eventContract.methods.remainingTickets().call();
        const name = await eventContract.methods.name().call();
        const symbol = await eventContract.methods.symbol().call();

        out.push({location, date, price, remainingTickets, name, symbol});
    }

    return out;
}
