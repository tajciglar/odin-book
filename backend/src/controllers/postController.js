import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPosts = async (req, res) => {

    const userId = req.user.id;

    try {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { authorId: userId},
                    { author: {
                        friends: {
                            some: { userId }
                        }
                    } 
                }
                ]
            },
            orderBy: {
                createdAt: 'desc', 
            },
            include: {
                author: {
                    select: {
                        userId: true,
                        username: true,
                    }
                }
            }
        });
        
        if(!posts){
            res.status(201).json({message: "No post avalible"})
        }
       
        res.status(201).json(posts)
    } catch (err) {
        console.error('Error getting posts:', err);
    }
}

export { getPosts }