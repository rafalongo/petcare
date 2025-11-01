import { db } from "../config/db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  phone?: string;
  role_id: number
}

export const UserModel = {
  async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  async findById(id: number) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  async create(user: User) {
    const { name, email, password_hash, phone, role_id } = user;
    const [result]: any = await db.query(
      "INSERT INTO users (name, email, password_hash, phone, role_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, password_hash, phone, role_id]
    );
    return { id: result.insertId, ...user };
  },

  async update(id: number, user: Partial<User>) {
    const fields = Object.entries(user)
      .map(([key]) => `${key} = ?`)
      .join(", ");
    const values = Object.values(user);
    await db.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },

  async remove(id: number) {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
  },
};
