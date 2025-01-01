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
        });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ userData });
    } catch (error) {
        console.error('Error in getUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateProfilePic = (req, res) => {
    console.log("file",req.file.path); 
    res.status(200).json({ message: 'Profile picture updated successfully', file: req.file });
};

const updateBio = async (req, res) => {
    try {
        // Handle the bio update logic here
        console.log(req.body);  // Assuming the bio data is in the request body
        // Update the bio in the database
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id }, // You will need to extract user ID from JWT or session
            data: { bio: req.body.bio },
        });

        res.status(200).json({ message: 'Bio updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating bio:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { getUser, updateProfilePic, updateBio };
