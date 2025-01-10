import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    try {
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
    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
});
