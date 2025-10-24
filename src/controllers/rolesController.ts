import { Request, Response } from 'express';
import { RolesModel } from '../models/rolesModel';
import { Role } from '../types/Role';

export const RolesController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const roles = await RolesModel.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch roles' });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const role = await RolesModel.getById(id);
            if (!role) {
                res.status(404).json({ error: 'Role not found' });
                return;
            }
            res.json(role);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch role' });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description } = req.body as Role;
            if (!name) {
                res.status(400).json({ error: 'Name is required' });
                return;
            }

            const newRole = await RolesModel.create({ name, description });
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create role' });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { name, description } = req.body as Role;

            const existingRole = await RolesModel.getById(id);
            if (!existingRole) {
                res.status(404).json({ error: 'Role not found' });
                return;
            }

            const updatedRole = await RolesModel.update(id, { name, description });
            res.json(updatedRole);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update role' });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const existingRole = await RolesModel.getById(id);
            if (!existingRole) {
                res.status(404).json({ error: 'Role not found' });
                return;
            }

            await RolesModel.delete(id);
            res.json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete role' });
        }
    },
};
