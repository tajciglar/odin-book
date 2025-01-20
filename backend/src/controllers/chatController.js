import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getMessages = async (req, res) => {
    const  userId = req.user.id;
    console.log(req.query)
    const { friendId } = req.query;

    if (!userId) {
        console.error("User Id is undefinied")
    }
    if (!friendId) {
        console.error("Friend Id is undefinied")
    }

    if (!userId || !friendId) {
        return res.status(400).json({ error: "User ID and Friend ID are required." });
    }
  
    try {
        const chat = await prisma.chat.findFirst({
            where: {
                participants: {
                    some: { userId: userId }, // The logged-in user should be a participant
                    some: { userId: Number(friendId) }, // The friend should be a participant
                },
            },
            include: {
                messages: {
                    orderBy: { sentAt: 'asc' }, // Order messages by sentAt (ascending)
                },
            },
        });
     
        if(!chat){
            return res.status(201).json({ message: "No previous messages"})
        }

        return res.status(201).json( chat )

    } catch (err) {
        console.error(err)
    }
    
}

const sendMessage = async (req, res) => {
    const userId = req.user.id;
    const { chatId, content, sentAt } = req.body;
    
    try {
        const newMessage = await prisma.message.create({
            data: {
                content,
                sentAt: new Date(sentAt),
                senderId: userId,
                chatId,
            },
        });
        return res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
    }
}

export { getMessages, sendMessage }