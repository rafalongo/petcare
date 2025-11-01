import { db } from "../config/db";

export interface Attachment {
    id?: number;
    pet_id: number;
    file_url: string;
    type: "exame" | "receita" | "vacina" | "outro";
    uploaded_at?: Date;
}

export const AttachmentModel = {
    async findByPetId(petId: number) {
        const [rows] = await db.query("SELECT * FROM attachments WHERE pet_id = ? ORDER BY uploaded_at DESC", [petId]);
        return rows;
    },

    async findById(id: number) {
        const [rows] = await db.query("SELECT * FROM attachments WHERE id = ?", [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    async create(attachment: Attachment) {
        const [result]: any = await db.query(
            "INSERT INTO attachments (pet_id, file_url, type) VALUES (?, ?, ?)",
            [attachment.pet_id, attachment.file_url, attachment.type || "outro"]
        );
        return { id: result.insertId, ...attachment };
    },

    async delete(id: number) {
        await db.query("DELETE FROM attachments WHERE id = ?", [id]);
    },
};
