import express from 'express'
import { get } from 'http'
const router = express.Router()

import { authUser,addUser, getUserProfile, updateUserProfile,getUsers, removeUser, updateUser, getUserById } from '../controllers/userController.js'
import { protect, administrator } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(addUser).get(protect, administrator ,getUsers)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .delete(protect, administrator, removeUser)
    .get(protect, administrator, getUserById)
    .put(protect, administrator, updateUser)

export default router