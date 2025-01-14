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
        const { id } = decodedToken;

        const userData = await prisma.user.findUnique({
            where: {
                userId: id,
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

const updateProfilePic = async (req, res) => {
    try {
        const { authToken } = req.cookies;

        if (!authToken) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const { id } = decodedToken;

        const profilePicUrl = `/uploads/${req.file.filename}`;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { avatarUrl: profilePicUrl },
        });

        res.status(200).json({
            message: 'Profile picture updated successfully',
            profilePicUrl,
        });
    } catch (error) {
        console.error('Error updating profile picture:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateBio = async (req, res) => {
    const { authToken } = req.cookies;

        if (!authToken) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const { id } = decodedToken;
        const bio = req.body.bio;
    
    try {
        
        const updatedUser = await prisma.user.update({
            where: { userId: id }, // You will need to extract user ID from JWT or session
            data: { bio: bio },
        });

        res.status(200).json({ message: 'Bio updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating bio:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getFriends = async (req, res) => {
    const { authToken } = req.cookies;

        if (!authToken) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
  
        const { id } = decodedToken;

    try {
        const userFriends = await prisma.user.findUnique({
            where: {
                userId: id, 
            },
            select: {
                friends: {
                    select: {
                        userId: true, 
                        username: true, 
                        active: true, 
                    }
                }
            }
        });

        console.log("user friends",userFriends.friends.chats)
        res.status(200).json(userFriends?.friends || []);
    } catch (err) {
        console.error('There was an error:' ,err);
    }
}



export { getUser, updateProfilePic, updateBio, getFriends };
