// import type {NextRequest, NextApiResponse} from 'next'

// Calling POST on this route will CREATE an event.
export async function POST(req: any,
                           res: any) {
    const {name, date, location} = await JSON.parse(req.body);
    if (!name || !date || !location) {
        res.status(400).json({message: 'missing required fields'});
    }

    // Create the event in the blockchain.
}
