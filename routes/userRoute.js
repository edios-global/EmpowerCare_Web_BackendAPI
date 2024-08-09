
import express from 'express'
import { addUser, getAllState, OTPVerification, validateUserEmail, addOnboardWizardDetail, forgotPassword } from '../controller/userController.js'
import multer from 'multer';
import path from 'path';
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

router.post('/addUser', addUser);
router.patch('/user', upload.single('FILE'), addOnboardWizardDetail);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.post('/fetchStates', getAllState);
router.post("/forgotPassword", forgotPassword)

export default router