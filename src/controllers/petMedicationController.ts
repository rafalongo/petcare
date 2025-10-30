import { Request, Response } from "express";
import { PetMedicationModel } from "../models/petMedicationModel";

export const PetMedicationController = {
    async getAll(req: Request, res: Response) {
        try {
            const records = await PetMedicationModel.getAll();
            res.json(records);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar registros de medicamentos dos pets", error });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const record = await PetMedicationModel.getById(Number(req.params.id));
            if (!record) return res.status(404).json({ message: "Registro não encontrado" });
            res.json(record);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar registro", error });
        }
    },

    async getByPetId(req: Request, res: Response) {
        try {
            const pet_id = Number(req.params.pet_id);
            const records = await PetMedicationModel.getByPetId(pet_id);
            res.json(records);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar medicamentos do pet", error });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const newRecord = await PetMedicationModel.create(req.body);
            res.status(201).json(newRecord);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar registro de medicamento", error });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const updated = await PetMedicationModel.update(Number(req.params.id), req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar registro", error });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await PetMedicationModel.delete(Number(req.params.id));
            res.json({ message: "Registro excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir registro", error });
        }
    },
};
