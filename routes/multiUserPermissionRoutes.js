
import express from 'express'
import { addUserAndPermission, deleteUser, fetchMenuOption, fetchUser, updateUser } from '../controller/multiUserPermissionController.js'


const router = express.Router()

router.get('/fetchMenuOption' , fetchMenuOption)
router.post('/userMange' , addUserAndPermission)
router.get('/userMange' , fetchUser)
router.delete('/userMange' , deleteUser)
router.put('/userMange' , updateUser)




export default router