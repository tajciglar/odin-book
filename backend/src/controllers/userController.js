import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

const getUser = async (req, res) => {
    try {
        const { authToken } = req.cookies;

        if (!authToken) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(authToken, SECRET_KEY);

        console.log('Decoded Token:', decodedToken);

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in getUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { getUser };
