import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
export const getFriends = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = `select id,username,email,name,coverPic,proFilePic,city,website from 
        (select u.* from users as u 
        join relationships as r 
        on (u.id = r.followedUserid)
        where  r.followerUserid = ?)  p
        where id  in
        (select u.id from users as u 
        join relationships as r 
        on (r.followerUserid = u.id)
        where r.followedUserid = ? )  `
        
        db.query(q, [data.id,data.id], (err, data) => {
            if (err) res.status(500).json(err)
            const {password,...others} = data
            return res.status(200).json(data)
        })
    })
    
}
export const getMessages = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = `select * from chat where userid = ?
        and friendid = ?
        union
        select * from chat where userid = ?
        and friendid = ?
        order by createdAt`
        console.log(req.query.friendid)
        db.query(q, [data.id,req.query.friendid,req.query.friendid,data.id], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}
export const getAllMessages = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = `select * from chat where userid = ?
        or friendid = ?  `
        // console.log(req.query.friendid)
        db.query(q, [data.id,data.id], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
    
}
export const sendMessages = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "insert into chat (`userid`,`friendid`,`message`,`img`,`createdAt`) values (?)"
        const values = [
            data.id,
            req.body.friendid,
            req.body.message,
            null,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]
        console.log(req.query.friendid)
        db.query(q, [values], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json('发送成功')
        })
    })
    
}