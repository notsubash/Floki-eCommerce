import express from 'express'
import { get } from 'http'
const router = express.Router()

import { authUser,addUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(addUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router