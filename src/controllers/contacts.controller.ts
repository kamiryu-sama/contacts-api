import { Request, Response } from 'express'
import { connect } from "../database";

export async function getContacts(req: Request, res: Response): Promise<Response> {
    const conn = await connect();

    const id = req.params.id;
    const contacts = await conn.query('SELECT * FROM contacts WHERE user_id = ?', [id]);

    return res.json(contacts[0]);
}

export async function addContact(req: Request, res: Response) {
    const conn = await connect();
    const conn2 = await connect();

    try {
        const id = req.params.id;
        const name = req.body.full_name;
        const email = req.body.email;

        await conn.query('INSERT INTO contacts (user_id, full_name, email) VALUES (?,?,?)', [id, name, email]);

        const contactId = await conn2.query('SELECT contact_id FROM contacts WHERE user_id = ? AND full_name = ? AND email = email', [id, name, email]);
        const string_id = JSON.stringify(contactId[0]);
        const json_id = JSON.parse(string_id);

        return res.json({
            message: "Contact Created",
            status: 200,
            contactId: json_id[0].contact_id
        })
    }
    catch (e) {
        return res.json({
            message: "Error",
            status: 400
        })
    }
}
