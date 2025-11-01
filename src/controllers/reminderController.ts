import { Request, Response } from "express";
import { ReminderModel } from "../models/reminderModel";

export const ReminderController = {
    async list(req: Request, res: Response) {
        try {
            const reminders = await ReminderModel.findAllByUser((req as any).user.id);
            res.json(reminders);
        } catch (err) {
            res.status(500).json({ error: "Erro ao listar lembretes." });
        }
    },

    async show(req: Request, res: Response) {
        try {
            const reminder = await ReminderModel.findById(Number(req.params.id), (req as any).user.id);
            if (!reminder) return res.status(404).json({ error: "Lembrete não encontrado." });
            res.json(reminder);
        } catch {
            res.status(500).json({ error: "Erro ao buscar lembrete." });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const reminder = await ReminderModel.create({
                ...req.body,
                user_id: (req as any).user.id,
            });
            res.status(201).json(reminder);
        } catch (err) {
            res.status(500).json({ error: "Erro ao criar lembrete." });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existing = await ReminderModel.findById(Number(id), (req as any).user.id);
            if (!existing) return res.status(404).json({ error: "Lembrete não encontrado." });

            await ReminderModel.update(Number(id), req.body);
            res.json({ message: "Lembrete atualizado com sucesso." });
        } catch {
            res.status(500).json({ error: "Erro ao atualizar lembrete." });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ReminderModel.delete(Number(id));
            res.json({ message: "Lembrete removido com sucesso." });
        } catch {
            res.status(500).json({ error: "Erro ao remover lembrete." });
        }
    },
};
