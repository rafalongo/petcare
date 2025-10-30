import { db } from "../config/db";

export const VaccineModel = {
    async getAll() {
        const [rows] = await db.query("SELECT * FROM vaccines ORDER BY name ASC");
        return rows;
    },

    async getById(id: number) {
        const [rows]: any = await db.query("SELECT * FROM vaccines WHERE id = ?", [id]);
        return rows[0];
    },

    async create(data: any) {
        const { name, description, species, recommended_age_weeks, periodicity_months } = data;
        const [result]: any = await db.query(
            `INSERT INTO vaccines (name, description, species, recommended_age_weeks, periodicity_months)
       VALUES (?, ?, ?, ?, ?)`,
            [name, description, species, recommended_age_weeks, periodicity_months]
        );
        return { id: result.insertId, ...data };
    },

    async update(id: number, data: any) {
        const { name, description, species, recommended_age_weeks, periodicity_months } = data;
        await db.query(
            `UPDATE vaccines
       SET name = ?, description = ?, species = ?, recommended_age_weeks = ?, periodicity_months = ?
       WHERE id = ?`,
            [name, description, species, recommended_age_weeks, periodicity_months, id]
        );
        return { id, ...data };
    },

    async delete(id: number) {
        await db.query("DELETE FROM vaccines WHERE id = ?", [id]);
        return { message: "Vaccine deleted successfully" };
    },
};
