
import express from 'express'
import { addUser, validateUserEmail } from '../controller/userController.js'
const router = express.Router()

router.get('/add', addUser);
router.post('/validateUserEmail', validateUserEmail);

export default router