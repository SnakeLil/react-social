import express from 'express'
import { getUser,getPost,getCurrentUser,updateUser } from '../controllers/user.js'
const router = express.Router()
router.get('/find/:userId', getUser)
router.get('/getPost/:userId', getPost)
router.get('/getCurrentUser', getCurrentUser)
router.put('/', updateUser)
export default router
