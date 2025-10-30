import { Request, Response } from "express";
import { PetVaccineModel } from "../models/petVaccineModel";

export const PetVaccineController = {
    async getAll(req: Request, res: Response) {
        try {
            const data = await PetVaccineModel.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error fetching pet vaccines" });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const data = await PetVaccineModel.getById(Number(req.params.id));
            if (!data) return res.status(404).json({ error: "Pet vaccine not found" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error fetching pet vaccine" });
        }
    },

    async getByPet(req: Request, res: Response) {
        try {
            const data = await PetVaccineModel.getByPetId(Number(req.params.petId));
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error fetching pet vaccines by pet ID" });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const newData = await PetVaccineModel.create(req.body);
            res.status(201).json(newData);
        } catch (error) {
            res.status(500).json({ error: "Error creating pet vaccine" });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const updated = await PetVaccineModel.update(Number(req.params.id), req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: "Error updating pet vaccine" });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const result = await PetVaccineModel.delete(Number(req.params.id));
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error deleting pet vaccine" });
        }
    },
};
