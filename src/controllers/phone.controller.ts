import { Request, Response } from 'express'
import { connect } from "../database";

export async function addPhone(req: Request, res: Response) {
    const conn = await connect();

    try {
        const id = req.params.id;
        const phone_number = req.body.phone_number;
        const phone_tag = req.body.phone_tag;

        await conn.query('INSERT INTO phones (contact_id, phone_number, phone_tag) VALUES (?,?,?)', [id, phone_number, phone_tag]);

        return res.json({
            message: "Phone Created",
            status: 200,
        })
    }
    catch (e) {
        return res.json({
            message: "Error",
            status: 400
        })
    }
}

export async function getPhones(req: Request, res: Response): Promise<Response> {
    const conn = await connect();

    const id = req.params.id;
    const phones = await conn.query('SELECT * FROM phones WHERE contact_id = ?', [id]);

    return res.json(phones[0]);
}