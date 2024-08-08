
import express from 'express'
import { addUser, getAllState, OTPVerification, validateUserEmail, addOnboardWizardDetail, forgotPassword } from '../controller/userController.js'

const router = express.Router()

router.post('/addUser', addUser);
router.put('/user', addOnboardWizardDetail);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.put('/addOnboardWizardDetail', addOnboardWizardDetail);
router.post('/fetchStates', getAllState);
router.post("/forgotPassword", forgotPassword)

export default router