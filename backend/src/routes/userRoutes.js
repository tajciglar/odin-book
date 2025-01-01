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
            cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
        }
    }),
});


// Route for getting user data
router.get('/profile', getUser);

// Route for updating profile picture
router.post('/update-profile-pic', upload.single('profilePicture'), updateProfilePic);

// Route for updating bio
router.put('/update-bio', updateBio);

export default router;
