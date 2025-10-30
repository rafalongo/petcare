import { db } from "../config/db";

export const PetMedicationModel = {
    getAll: async () => {
        const [rows] = await db.query(`
      SELECT 
        pm.*, 
        p.name AS pet_name, 
        m.name AS medication_name, 
        m.type AS medication_type
      FROM pet_medications pm
      JOIN pets p ON pm.pet_id = p.id
      JOIN medications m ON pm.medication_id = m.id
      ORDER BY pm.application_date DESC
    `);
        return rows;
    },

    getById: async (id: number) => {
        const [rows] = await db.query(`
      SELECT 
        pm.*, 
        p.name AS pet_name, 
        m.name AS medication_name, 
        m.type AS medication_type
      FROM pet_medications pm
      JOIN pets p ON pm.pet_id = p.id
      JOIN medications m ON pm.medication_id = m.id
      WHERE pm.id = ?
    `, [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    create: async (data: any) => {
        const { pet_id, medication_id, application_date, next_due_date, notes, status } = data;
        const [result]: any = await db.query(
            `INSERT INTO pet_medications (pet_id, medication_id, application_date, next_due_date, notes, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [pet_id, medication_id, application_date, next_due_date, notes, status]
        );
        return { id: result.insertId, ...data };
    },

    update: async (id: number, data: any) => {
        const { pet_id, medication_id, application_date, next_due_date, notes, status } = data;
        await db.query(
            `UPDATE pet_medications 
       SET pet_id=?, medication_id=?, application_date=?, next_due_date=?, notes=?, status=?
       WHERE id=?`,
            [pet_id, medication_id, application_date, next_due_date, notes, status, id]
        );
        return { id, ...data };
    },

    delete: async (id: number) => {
        await db.query("DELETE FROM pet_medications WHERE id = ?", [id]);
    },

    getByPetId: async (pet_id: number) => {
        const [rows] = await db.query(`
      SELECT 
        pm.*, 
        m.name AS medication_name, 
        m.type AS medication_type 
      FROM pet_medications pm
      JOIN medications m ON pm.medication_id = m.id
      WHERE pm.pet_id = ?
      ORDER BY pm.next_due_date ASC
    `, [pet_id]);
        return rows;
    },
};
