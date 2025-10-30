import { Request, Response } from "express";
import { VaccineModel } from "../models/vaccineModel";

export const VaccineController = {
    async getAll(req: Request, res: Response) {
        try {
            const vaccines = await VaccineModel.getAll();
            res.json(vaccines);
        } catch (error) {
            res.status(500).json({ error: "Error fetching vaccines" });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const vaccine = await VaccineModel.getById(Number(req.params.id));
            if (!vaccine) return res.status(404).json({ error: "Vaccine not found" });
            res.json(vaccine);
        } catch (error) {
            res.status(500).json({ error: "Error fetching vaccine" });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const vaccine = await VaccineModel.create(req.body);
            res.status(201).json(vaccine);
        } catch (error) {
            res.status(500).json({ error: "Error creating vaccine" });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const vaccine = await VaccineModel.update(Number(req.params.id), req.body);
            res.json(vaccine);
        } catch (error) {
            res.status(500).json({ error: "Error updating vaccine" });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const result = await VaccineModel.delete(Number(req.params.id));
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error deleting vaccine" });
        }
    },
};
