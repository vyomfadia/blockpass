"use server";

import {neon} from "@neondatabase/serverless";

type Ticket = {
    buyerAddress: string;
    eventId: string;
    ticketId: string;
}

export async function getTickets(buyerAddress: string): Promise<Ticket[]> {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`select buyer_address, event_id, token_id from tickets where buyer_address = ${buyerAddress}`;
    return data.map((row: any) => ({
        buyerAddress: row.buyer_address,
        eventId: row.event_id,
        ticketId: row.token_id,
    }));
}

export async function insertTickets(buyerAddress: string, eventId: string, ticketId: string): Promise<any> {
    const sql = neon(process.env.DATABASE_URL);
    return sql`insert into tickets (buyer_address, event_id, token_id) values (${buyerAddress}, ${eventId}, ${ticketId})`;
}

export async function getTicketByContractAndTicketId(eventId: string, ticketId: string): Promise<Ticket> {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`select buyer_address, event_id, token_id from tickets where event_id = ${eventId} and token_id = ${ticketId}`;
    return data.map((row: any) => ({
        buyerAddress: row.buyer_address,
        eventId: row.event_id,
        ticketId: row.token_id,
    }))[0];
}
