import { NextApiRequest, NextApiResponse } from "next";
import {insertTickets} from "@/app/(lib)/database/ticket_manager";

export function POST(req: NextApiRequest, res: NextApiResponse): void {
    const {buyerAddress, tokenId, eventId} = req.body;
    if (!buyerAddress || !tokenId || !eventId) {
        res.status(400).json({error: 'missing parameters'});
        return;
    }



    res.status(200).json({message: 'success'});
}