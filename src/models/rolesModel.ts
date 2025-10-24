import { db } from '../config/db';
import { Role } from '../types/Role';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const RolesModel = {
    getAll: async (): Promise<Role[]> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM roles');
        return rows as Role[];
    },

    getById: async (id: number): Promise<Role | null> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM roles WHERE id = ?', [id]);
        return (rows.length ? (rows[0] as Role) : null);
    },

    create: async (data: Role): Promise<Role> => {
        const { name, description } = data;
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO roles (name, description) VALUES (?, ?)',
            [name, description]
        );
        return { id: result.insertId, name, description };
    },

    update: async (id: number, data: Role): Promise<Role> => {
        const { name, description } = data;
        await db.query(
            'UPDATE roles SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name, description, id]
        );
        return { id, name, description };
    },

    delete: async (id: number): Promise<{ message: string }> => {
        await db.query('DELETE FROM roles WHERE id = ?', [id]);
        return { message: 'Role deleted successfully' };
    },
};
