import { db } from "../config/db";

interface RefreshToken {
    id?: number;
    user_id: number;
    token: string;
    expires_at: Date;
}

export const RefreshTokenModel = {
    async create(data: RefreshToken) {
        const [result]: any = await db.query(
            "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
            [data.user_id, data.token, data.expires_at]
        );
        return { id: result.insertId, ...data };
    },

    async findByToken(token: string) {
        const [rows]: any = await db.query(
            "SELECT * FROM refresh_tokens WHERE token = ? LIMIT 1",
            [token]
        );
        return rows[0];
    },

    async remove(id: number) {
        await db.query("DELETE FROM refresh_tokens WHERE id = ?", [id]);
    },

    async removeByToken(token: string) {
        await db.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
    },

    async removeAllByUser(userId: number) {
        await db.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
    },
};
