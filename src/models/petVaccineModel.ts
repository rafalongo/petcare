import { db } from "../config/db";

export const PetVaccineModel = {
    async getAll() {
        const [rows] = await db.query(`
      SELECT pv.*, 
             p.name AS pet_name, 
             v.name AS vaccine_name, 
             v.species AS vaccine_species
      FROM pet_vaccines pv
      JOIN pets p ON pv.pet_id = p.id
      JOIN vaccines v ON pv.vaccine_id = v.id
      ORDER BY pv.application_date DESC
    `);
        return rows;
    },

    async getById(id: number) {
        const [rows]: any = await db.query(`
      SELECT pv.*, 
             p.name AS pet_name, 
             v.name AS vaccine_name
      FROM pet_vaccines pv
      JOIN pets p ON pv.pet_id = p.id
      JOIN vaccines v ON pv.vaccine_id = v.id
      WHERE pv.id = ?
    `, [id]);
        return rows[0];
    },

    async getByPetId(petId: number) {
        const [rows] = await db.query(`
      SELECT pv.*, v.name AS vaccine_name
      FROM pet_vaccines pv
      JOIN vaccines v ON pv.vaccine_id = v.id
      WHERE pv.pet_id = ?
      ORDER BY pv.application_date DESC
    `, [petId]);
        return rows;
    },

    async create(data: any) {
        const { pet_id, vaccine_id, application_date, next_due_date, notes, status } = data;
        const [result]: any = await db.query(`
      INSERT INTO pet_vaccines (pet_id, vaccine_id, application_date, next_due_date, notes, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [pet_id, vaccine_id, application_date, next_due_date, notes, status]);
        return { id: result.insertId, ...data };
    },

    async update(id: number, data: any) {
        const { pet_id, vaccine_id, application_date, next_due_date, notes, status } = data;
        await db.query(`
      UPDATE pet_vaccines
      SET pet_id = ?, vaccine_id = ?, application_date = ?, next_due_date = ?, notes = ?, status = ?
      WHERE id = ?
    `, [pet_id, vaccine_id, application_date, next_due_date, notes, status, id]);
        return { id, ...data };
    },

    async delete(id: number) {
        await db.query("DELETE FROM pet_vaccines WHERE id = ?", [id]);
        return { message: "Pet vaccine deleted successfully" };
    },
};
