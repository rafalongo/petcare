import { db } from "../config/db";

export const MedicationModel = {
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM medications ORDER BY name ASC");
        return rows;
    },

    getById: async (id: number) => {
        const [rows] = await db.query("SELECT * FROM medications WHERE id = ?", [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    create: async (data: any) => {
        const { name, type, description, species, periodicity_days } = data;
        const [result]: any = await db.query(
            "INSERT INTO medications (name, type, description, species, periodicity_days) VALUES (?, ?, ?, ?, ?)",
            [name, type, description, species, periodicity_days]
        );
        return { id: result.insertId, ...data };
    },

    update: async (id: number, data: any) => {
        const { name, type, description, species, periodicity_days } = data;
        await db.query(
            "UPDATE medications SET name=?, type=?, description=?, species=?, periodicity_days=? WHERE id=?",
            [name, type, description, species, periodicity_days, id]
        );
        return { id, ...data };
    },

    delete: async (id: number) => {
        await db.query("DELETE FROM medications WHERE id = ?", [id]);
    },
};
