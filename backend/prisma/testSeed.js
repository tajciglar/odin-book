import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Starting seed...");

        // Create Admin User
        const hashedPass = await bcrypt.hash("admin123", 10);
        const admin = await prisma.user.create({
            data: {
                username: "Admin",
                email: "admin@example.com",
                password: hashedPass,
                bio: "This is admin's profile",
            },
        });
        console.log("Admin created:", admin);

        // Create 10 users
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = await prisma.user.create({
                data: {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: await bcrypt.hash(faker.internet.password(), 10),
                    bio: faker.lorem.sentence(),
                    avatarUrl: faker.image.avatar(),
                    active: i % 2 === 0,
                },
            });
            users.push(user);
        }

        console.log("Users created:", users.length);

        // Make all users friends with the admin and each other
        for (const user of users) {
            // Connect each user with all other users and the admin
            const otherUsers = users.filter(u => u.userId !== user.userId);
            await prisma.user.update({
                where: { userId: user.userId },
                data: {
                    friends: {
                        connect: otherUsers.map(u => ({ userId: u.userId })).concat({ userId: admin.userId }),
                    },
                },
            });
        }

        // Make Admin friends with all users
        await prisma.user.update({
            where: { userId: admin.userId },
            data: {
                friends: {
                    connect: users.map(user => ({ userId: user.userId })),
                },
            },
        });

        console.log("Friendships created");

        // Create posts for each user (including admin)
        const allUsers = [admin, ...users];
        const posts = [];
        for (const user of allUsers) {
            for (let i = 0; i < 3; i++) {
                const post = await prisma.post.create({
                    data: {
                        title: faker.lorem.words(5),
                        content: faker.lorem.paragraph(),
                        imageUrl: faker.image.imageUrl(),
                        author: { connect: { userId: user.userId } },
                        published: faker.datatype.boolean(),
                    },
                });
                posts.push(post);
            }
        }
        console.log("Posts created:", posts.length);

        // Add comments to posts
        const comments = [];
        for (const post of posts) {
            const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 3);
            for (const user of randomUsers) {
                const comment = await prisma.comment.create({
                    data: {
                        content: faker.lorem.sentence(),
                        author: { connect: { userId: user.userId } },
                        post: { connect: { postId: post.postId } },
                    },
                });
                comments.push(comment);
            }
        }
        console.log("Comments created:", comments.length);

        // Add likes to posts and comments
        const likes = [];
        for (const post of posts) {
            const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 3);
            for (const user of randomUsers) {
                const like = await prisma.like.create({
                    data: {
                        user: { connect: { userId: user.userId } },
                        post: { connect: { postId: post.postId } },
                    },
                });
                likes.push(like);
            }
        }

        for (const comment of comments) {
            const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 2);
            for (const user of randomUsers) {
                const like = await prisma.like.create({
                    data: {
                        user: { connect: { userId: user.userId } },
                        comment: { connect: { commentId: comment.commentId } },
                    },
                });
                likes.push(like);
            }
        }
        console.log("Likes created:", likes.length);

        // Create chats and messages between users and the admin
        for (const user of users) {
            const chat = await prisma.chat.create({
                data: {
                    participants: {
                        create: [
                            { userId: admin.userId },
                            { userId: user.userId },
                        ],
                    },
                    messages: {
                        create: [
                            {
                                content: `Hi Admin, this is ${user.username}!`,
                                senderId: user.userId,
                            },
                            {
                                content: `Hello ${user.username}! How can I help you?`,
                                senderId: admin.userId,
                            },
                        ],
                    },
                },
            });

            console.log(`Chat created between Admin (id: ${admin.userId}) and ${user.username} (id: ${user.userId})`);
        }

        console.log("Chats and messages created");
    } catch (error) {
        console.error("Error during seed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
});