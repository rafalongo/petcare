import { db } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';

interface RefreshToken {
    id?: number;
    user_id: number;
    token: string;
    expires_at: Date;
}

export const AuthModel = {
    saveRefreshToken: async (user_id: number, token: string, expires_at: Date): Promise<void> => {
        await db.query<ResultSetHeader>(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
            [user_id, token, expires_at]
        );
    },

    getRefreshToken: async (token: string): Promise<RefreshToken | null> => {
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM refresh_tokens WHERE token = ?',
            [token]
        );
        return rows.length ? (rows[0] as RefreshToken) : null;
    },

    deleteRefreshToken: async (token: string): Promise<void> => {
        await db.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
    },

    generateRefreshToken: (user_id: number): { token: string; expires_at: Date } => {
        const expiresInDays = 7; // validade de 7 dias
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);

        const token = jwt.sign({ user_id }, JWT_REFRESH_SECRET, { expiresIn: `${expiresInDays}d` });
        return { token, expires_at: expiresAt };
    },
};
