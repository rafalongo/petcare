import { Request, Response } from "express";
import { MedicationModel } from "../models/medicationModel";

export const MedicationController = {
    async getAll(req: Request, res: Response) {
        try {
            const medications = await MedicationModel.getAll();
            res.json(medications);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar medicamentos", error });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const medication = await MedicationModel.getById(Number(req.params.id));
            if (!medication) return res.status(404).json({ message: "Medicamento não encontrado" });
            res.json(medication);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar medicamento", error });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const newMedication = await MedicationModel.create(req.body);
            res.status(201).json(newMedication);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar medicamento", error });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const updatedMedication = await MedicationModel.update(Number(req.params.id), req.body);
            res.json(updatedMedication);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar medicamento", error });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await MedicationModel.delete(Number(req.params.id));
            res.json({ message: "Medicamento excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir medicamento", error });
        }
    },
};
