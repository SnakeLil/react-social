import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken" 
export const getFollow = (req,res)=>{
    const q = `select followerUserid
    from relationships
    where
    followedUserid =  ?`;
    db.query(q, [req.query.followerUserid], (err, data) => {
        if (err) res.status(500).json(err)
        return res.status(200).json(data.map(item=>item.followerUserid))
    })
}
export const follow = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "insert into relationships (`followerUserid`,`followedUserid`)values(?)"
        const values =[
            data.id,
            req.query.followedUserid,
        ]
        db.query(q, [values], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json("关注成功")
        })
    })
}
export const unfollow = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "delete from relationships where `followerUserid` = ? and `followedUserid` = ?"

        db.query(q, [data.id,req.query.followedUserid], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json("取关成功")
        })
    })
}