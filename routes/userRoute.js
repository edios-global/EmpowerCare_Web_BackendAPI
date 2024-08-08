
import express from 'express'
import { addUser, getAllState, OTPVerification, validateUserEmail, addOnboardWizardDetail } from '../controller/userController.js'

const router = express.Router()

router.post('/addUser', addUser);
router.put('/user', addOnboardWizardDetail);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.put('/addOnboardWizardDetail', addOnboardWizardDetail);
router.post('/fetchStates', getAllState);


export default router