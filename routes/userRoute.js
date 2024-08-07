
import express from 'express'
import { addUser, getAllState, OTPVerification, validateUserEmail, addOnboardWizardDetail, forgotPassword, verifyOTP, changePassword } from '../controller/userController.js'

const router = express.Router()

router.post('/addUser', addUser);
router.patch('/user', addOnboardWizardDetail);
router.post('/validateUserEmail', validateUserEmail);
router.post('/verifyOtp', OTPVerification);
router.put('/addOnboardWizardDetail', addOnboardWizardDetail);
router.post('/fetchStates', getAllState);
router.post("/forgotPassword", forgotPassword)
router.post("/verifyOtpMobile", verifyOTP)
router.put("/changePassword", changePassword)



export default router