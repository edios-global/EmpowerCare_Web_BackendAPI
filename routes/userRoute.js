
import express from 'express'
import { addUser, OTPVerification, validateUserEmail, addOnboardWizardDetail } from '../controller/userController.js'
const router = express.Router()

router.post('/addUser', addUser);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.put('/addOnboardWizardDetail', addOnboardWizardDetail);


export default router