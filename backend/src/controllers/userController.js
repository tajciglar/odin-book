import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET;

const getUser = async (req, res) => {
    try {
        const { authToken } = req.cookies;

        if (!authToken) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(authToken, SECRET_KEY);

        const { id } = decodedToken; // Include both

        const userData = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                username: true,
                bio: true,
                avatarUrl: true,
            },
        })

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ userData })
    } catch (error) {
        console.error('Error in getUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { getUser };
