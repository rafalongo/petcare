import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthModel } from '../models/authModel';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'access_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';

export const AuthController = {
    // REFRESH TOKEN
    refresh: async (req: Request, res: Response): Promise<void> => {
        try {
            const { refresh_token } = req.body;
            if (!refresh_token) {
                res.status(400).json({ error: 'Refresh token is required' });
                return;
            }

            const storedToken = await AuthModel.getRefreshToken(refresh_token);
            if (!storedToken) {
                res.status(403).json({ error: 'Invalid refresh token' });
                return;
            }

            // Verifica se o token ainda é válido
            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
                if (err) {
                    res.status(403).json({ error: 'Expired or invalid refresh token' });
                    return;
                }

                const newAccessToken = jwt.sign(
                    { id: decoded.user_id },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({ access_token: newAccessToken });
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to refresh token' });
        }
    },

    // 🚪 LOGOUT
    logout: async (req: Request, res: Response): Promise<void> => {
        try {
            const { refresh_token } = req.body;
            if (!refresh_token) {
                res.status(400).json({ error: 'Refresh token is required' });
                return;
            }

            await AuthModel.deleteRefreshToken(refresh_token);
            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to logout' });
        }
    },
};
