import express from 'express'
import { follow,getFollow, unfollow} from '../controllers/relationship.js'

const router = express.Router()
router.get('/',getFollow )
router.post('/',follow)
router.delete('/',unfollow)
export default router
