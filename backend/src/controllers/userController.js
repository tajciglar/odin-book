import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
const prisma = new PrismaClient();

// SignUp function
async function SignUp(req, res) {
    const userData = req.body;
    console.log(req)
    
    // Input validation
    await body('email').isEmail().withMessage('Must be a valid email').run(req);
    await body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .run(req);
    await body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
        .run(req);

    const errors = validationResult(req);
    console.log(errors)
    // Send back validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        // Check if the user already exists
        const emailExists = await prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        console.log(emailExists)
        if (emailExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(userData.password, 10);

        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser.id, email: newUser.email }, 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// LogIn function
async function LogIn(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return a success response + generate token
        const token = jwt.sign({id: user.id, username: user.username}, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email }, token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { SignUp, LogIn };