import { db } from "../config/db"; // sua conexão com o banco

export interface Pet {
    id?: number;
    user_id: number;
    name: string;
    species: string;
    breed?: string;
    birth_date?: string;
    weight?: number;
    gender?: string;
    photo_url?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const PetModel = {
    async create(pet: Pet) {
        const [result]: any = await db.query(
            `INSERT INTO pets (user_id, name, species, breed, birth_date, weight, gender, photo_url, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [pet.user_id, pet.name, pet.species, pet.breed, pet.birth_date, pet.weight, pet.gender, pet.photo_url]
        );
        return { id: result.insertId, ...pet };
    },

    async findAllByUser(user_id: number) {
        const [rows] = await db.query(`SELECT * FROM pets WHERE user_id = ?`, [user_id]);
        return rows;
    },

    async findById(id: number) {
        const [rows] = await db.query<any>(`SELECT * FROM pets WHERE id = ?`, [id]);
        return rows[0];
    },

    async update(id: number, pet: Partial<Pet>) {
        const [result] = await db.query(
            `UPDATE pets SET name=?, species=?, breed=?, birth_date=?, weight=?, gender=?, photo_url=?, updated_at=NOW() WHERE id=?`,
            [pet.name, pet.species, pet.breed, pet.birth_date, pet.weight, pet.gender, pet.photo_url, id]
        );
        return result;
    },

    async delete(id: number) {
        const [result] = await db.query(`DELETE FROM pets WHERE id=?`, [id]);
        return result;
    },
};
