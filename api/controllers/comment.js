import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
export const getComments = (req,res)=>{
        const q = `select c.*,u.name,u.profilePic
        from comments as c
        join users as u 
        on (c.userid = u.id)
        where
        c.postid =  ?
        order by c.createdAt desc `;
        db.query(q, [req.query.postid], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    
}
export const addComment = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "insert into comments (`desc`,`postid`,`userid`,`createdAt`)values(?)"
        const values = [
            req.body.desc,
            req.body.postid,
            data.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
            
        db.query(q, [values], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json("评论发布成功")
        })
    })
}