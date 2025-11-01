import { Request, Response } from "express";
import { AttachmentModel } from "../models/attachmentModel";
import fs from "fs";
import path from "path";

export const AttachmentController = {
    async listByPet(req: Request, res: Response) {
        try {
            const petId = Number(req.params.petId);
            const attachments = await AttachmentModel.findByPetId(petId);
            res.json(attachments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar anexos." });
        }
    },

    async show(req: Request, res: Response) {
        try {
            const attachment = await AttachmentModel.findById(Number(req.params.id));
            if (!attachment) return res.status(404).json({ error: "Anexo não encontrado." });
            res.json(attachment);
        } catch {
            res.status(500).json({ error: "Erro ao buscar anexo." });
        }
    },

    async upload(req: Request, res: Response) {
        try {
            if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado." });

            const petId = Number(req.params.petId);
            const fileUrl = `/uploads/${req.file.filename}`;
            const { type } = req.body;

            const attachment = await AttachmentModel.create({
                pet_id: petId,
                file_url: fileUrl,
                type: type || "outro",
            });

            res.status(201).json(attachment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao enviar arquivo." });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const attachment = await AttachmentModel.findById(Number(id));

            if (!attachment) return res.status(404).json({ error: "Anexo não encontrado." });

            // Remove arquivo físico, se existir
            const filePath = path.join(__dirname, "../../", attachment.constructor.name);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            await AttachmentModel.delete(Number(id));
            res.json({ message: "Anexo removido com sucesso." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao remover anexo." });
        }
    },
};
