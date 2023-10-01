import  express  from "express";
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import relationshipRoutes from './routes/relationship.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import recRoutes from './routes/rec.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express();
//配置中间件
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Credentials',true)

    next()
})
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(cookieParser())

app.use('/api/users',userRoutes)

app.use('/api/recommend',recRoutes)

app.use('/api/posts',postRoutes)

app.use('/api/likes',likeRoutes)

app.use('/api/auth',authRoutes)

app.use('/api/relationships',relationshipRoutes)

app.use('/api/comments',commentRoutes)

app.use('/api/chat',chatRoutes)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../react-social-media/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/api/upload',upload.single('file'),(req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})
app.listen(8800,()=>{
    console.log(`!!0.0-Server is running on port 8800-0.0!!`);
})