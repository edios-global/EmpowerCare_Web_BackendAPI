
import express, { Router } from 'express'
import { addUser } from '../controller/userController.js'
const router = express.Router()

router.get('/add' , addUser)

export default router