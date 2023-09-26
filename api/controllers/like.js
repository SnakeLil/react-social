import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken" 
export const getLikes = (req,res)=>{
    //todo

    const q = `select userid
    from likes
    where
    postid =  ?`;
    db.query(q, [req.query.postid], (err, data) => {
        if (err) res.status(500).json(err)
        return res.status(200).json(data.map(item=>item.userid))
    })
}
export const addLike = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "insert into likes (`postid`,`userid`)values(?)"
        const values =[
            req.body.postid,
            data.id,
        ]
        db.query(q, [values], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json("点赞成功")
        })
    })
}
export const delLike = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "delete from likes where `postid` = ? and `userid` = ?"

        db.query(q, [req.query.postid,data.id], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json("取消点赞成功")
        })
    })
}