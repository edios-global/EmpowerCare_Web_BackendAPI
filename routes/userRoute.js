
import express from 'express'
import { addUser, getAllState, OTPVerification, validateUserEmail } from '../controller/userController.js'
const router = express.Router()

router.post('/addUser', addUser);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.post('/fetchStates', getAllState);

export default router