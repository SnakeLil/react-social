import express from 'express'
import { getRecUser} from '../controllers/rec.js'

const router = express.Router()
router.get('/',getRecUser )

export default router