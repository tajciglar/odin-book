import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getMessages = async (req, res) => {
    const { authToken } = req.cookies;
    const { friendId } = req.query;


    if (!authToken) {
            return res.status(401).json({ message: 'Authentication token missing' });
    }

    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    const { id } = decodedToken ;
  
    try {
        const messages = await prisma.chat.findFirst({
            where: {
                participants: {
                    some: { id: id }, // The logged-in user should be a participant
                    some: { id: Number(friendId) }, // The friend should be a participant
                },
            },
            include: {
                messages: {
                    orderBy: { sentAt: 'asc' }, // Order messages by sentAt (ascending)
                },
            },
        });

        console.log(messages)
    } catch (err) {
        console.error(err)
    }
    
}

export { getMessages }