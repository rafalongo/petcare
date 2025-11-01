import { db } from "../config/db";

export interface Role {
    id?: number;
    name: string;
    description?: string;
}

export const RoleModel = {
    async findAll() {
        const [rows] = await db.query("SELECT * FROM roles ORDER BY id ASC");
        return rows;
    },

    async findById(id: number) {
        const [rows] = await db.query("SELECT * FROM roles WHERE id = ?", [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    async findByName(name: string) {
        const [rows] = await db.query("SELECT * FROM roles WHERE name = ?", [name]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    async create(role: Role) {
        const [result]: any = await db.query(
            "INSERT INTO roles (name, description) VALUES (?, ?)",
            [role.name, role.description || null]
        );
        return { id: result.insertId, ...role };
    },

    async update(id: number, role: Role) {
        await db.query("UPDATE roles SET name = ?, description = ? WHERE id = ?", [
            role.name,
            role.description,
            id,
        ]);
    },

    async delete(id: number) {
        await db.query("DELETE FROM roles WHERE id = ?", [id]);
    },
};
