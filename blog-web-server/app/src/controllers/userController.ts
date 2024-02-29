import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../models/user';
import jwt from 'jsonwebtoken';



export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const userRepository = getRepository(Users);
        const user = await userRepository.findOne({ where: { username } });

        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        if (user.password !== password) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        const token = jwt.sign({ userId: user.id }, 'software_developer', { expiresIn: '1h' });
        res.status(200).json({ token, username: user.username });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRepository = getRepository(Users);
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserByName = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.params;
        const userRepository = getRepository(Users);
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
