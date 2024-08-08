
import express from 'express'
import { addUser, getAllState, loginUser, OTPVerification, validateUserEmail } from '../controller/userController.js'
const router = express.Router()

router.post('/addUser', addUser);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.post('/fetchStates', getAllState);
router.post('/loginUser', loginUser);

export default router