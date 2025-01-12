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
                    password: faker.internet.password(),
                    bio: faker.lorem.sentence(),
                    avatarUrl: faker.image.avatar(),
                    active: i % 2 === 0,
                },
            });
            users.push(user);
        }

        console.log("Users created:", users.length);

        // Make users friends with each other and with Admin
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const otherUsers = users.filter(u => u.id !== user.id);
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    friends: {
                        connect: otherUsers.map(u => ({ id: u.id })).concat({ id: admin.id }),
                    },
                },
            });
        }

        // Make Admin friends with all users
        await prisma.user.update({
            where: { id: admin.id },
            data: {
                friends: {
                    connect: users.map(user => ({ id: user.id })),
                },
            },
        });

        console.log("Friendships created");

        // Add 5 posts for each user (including admin)
        const allUsers = [admin, ...users];
        for (const user of allUsers) {
            for (let i = 0; i < 5; i++) {
                await prisma.post.create({
                    data: {
                        title: faker.lorem.words(5),
                        content: faker.lorem.paragraph(),
                        imageUrl: faker.image.imageUrl(),
                        author: { connect: { id: user.id } },
                        published: faker.datatype.boolean(),
                    },
                });
            }
        }

        console.log("Posts created");

        // Add random comments to posts
        const posts = await prisma.post.findMany();
        for (const post of posts) {
            const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 3);
            for (const user of randomUsers) {
                await prisma.comment.create({
                    data: {
                        content: faker.lorem.sentence(),
                        author: { connect: { id: user.id } },
                        post: { connect: { id: post.id } },
                    },
                });
            }
        }

        console.log("Comments created");

        // Add random likes to posts and comments
        const comments = await prisma.comment.findMany();
        for (const post of posts) {
            const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 3);
            for (const user of randomUsers) {
                await prisma.like.create({
                    data: {
                        user: { connect: { id: user.id } },
                        post: { connect: { id: post.id } },
                    },
                });
            }
        }

        for (const comment of comments) {
            const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 2);
            for (const user of randomUsers) {
                await prisma.like.create({
                    data: {
                        user: { connect: { id: user.id } },
                        comment: { connect: { id: comment.id } },
                    },
                });
            }
        }

        console.log("Likes created");

        // Add chats between users and admin
        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            // Create chat with the admin and the current user
            const chat = await prisma.chat.create({
                data: {
                    participants: {
                        create: [
                            { userId: admin.id },
                            { userId: user.id },
                        ],
                    },
                    messages: {
                        create: [
                            {
                                content: `Hello ${user.username}!`,
                                senderId: admin.id,
                            },
                        ],
                    },
                },
            });

            console.log(`Chat created between Admin (id: 1) and ${user.username} (id: ${user.id})`);
        }

        console.log("Chats created");

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
