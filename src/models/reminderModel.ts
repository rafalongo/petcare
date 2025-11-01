import { db } from "../config/db";

export interface Reminder {
    id?: number;
    user_id: number;
    pet_id?: number;
    title: string;
    message?: string;
    reminder_date: Date;
    sent?: boolean;
    channel?: "email" | "whatsapp" | "push";
}

export const ReminderModel = {
    async findAllByUser(userId: number) {
        const [rows] = await db.query("SELECT * FROM reminders WHERE user_id = ? ORDER BY reminder_date DESC", [userId]);
        return rows;
    },

    async findById(id: number, userId: number) {
        const [rows] = await db.query("SELECT * FROM reminders WHERE id = ? AND user_id = ?", [id, userId]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    async create(reminder: Reminder) {
        const [result]: any = await db.query(
            `INSERT INTO reminders (user_id, pet_id, title, message, reminder_date, channel)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [reminder.user_id, reminder.pet_id || null, reminder.title, reminder.message || "", reminder.reminder_date, reminder.channel || "email"]
        );
        return { id: result.insertId, ...reminder };
    },

    async update(id: number, reminder: Partial<Reminder>) {
        await db.query(
            `UPDATE reminders SET pet_id = ?, title = ?, message = ?, reminder_date = ?, channel = ?, sent = ?
       WHERE id = ?`,
            [
                reminder.pet_id || null,
                reminder.title,
                reminder.message,
                reminder.reminder_date,
                reminder.channel || "email",
                reminder.sent || false,
                id,
            ]
        );
    },

    async delete(id: number) {
        await db.query("DELETE FROM reminders WHERE id = ?", [id]);
    },

    async findPending() {
        const [rows] = await db.query(
            `SELECT * FROM reminders 
       WHERE reminder_date <= NOW() 
       AND sent = false`
        );
        return rows;
    },

    async markAsSent(id: number) {
        await db.query("UPDATE reminders SET sent = true WHERE id = ?", [id]);
    },
};
