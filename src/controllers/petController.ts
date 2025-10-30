import { Request, Response } from "express";
import { PetModel } from "../models/petModel";

export const PetController = {
    async create(req: Request, res: Response) {
        try {
            console.log("REQ", req.body);
            const user_id = (req as any).user.id;
            const pet = await PetModel.create({ ...req.body, user_id });
            res.status(201).json({ message: "Pet criado com sucesso", pet });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar pet" });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const user_id = (req as any).user.id;
            const pets = await PetModel.findAllByUser(user_id) || {};
            res.json(pets);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pets" });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const pet = await PetModel.findById(Number(req.params.id));
            if (!pet) return res.status(404).json({ error: "Pet não encontrado" });
            res.json(pet);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pet" });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const pet = await PetModel.update(Number(req.params.id), req.body);
            res.json({ message: "Pet atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar pet" });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await PetModel.delete(Number(req.params.id));
            res.json({ message: "Pet removido com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao remover pet" });
        }
    },
};
