import express from 'express';
import { getFriends ,getMessages,getAllMessages,sendMessages} from '../controllers/chat.js';
const router = express.Router();

router.get('/friends',getFriends)
router.get('/messages',getMessages)
router.get('/allMessages',getAllMessages)
router.post('/messages',sendMessages)

export default router;