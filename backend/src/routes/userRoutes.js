import express from 'express';
import { getUser, updateProfilePic, updateBio } from '../controllers/userController.js';
import multer from 'multer';
import path from 'path';
const router = express.Router();

// File upload settings
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.resolve('uploads');
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});


// Route for getting user data
router.get('/profile', getUser);

// Route for updating profile picture
router.post('/update-profile-pic', upload.single('profilePicture'), updateProfilePic);

// Route for updating bio
router.post('/update-bio', updateBio);

export default router;
