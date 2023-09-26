import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
export const getPosts = (req, res) => {
    const userid = req.query.userid
    console.log(userid)
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = userid?`select posts.*,users.name,users.proFilePic 
        from posts join users on posts.userid = users.id 
        where userid = ?
        order by posts.createdAt desc`:
         `select p .*,u.name,u.proFilePic,followedUserid,count(*)
        from posts as p 
        join users as u 
        on (p.userid = u.id)
        left join relationships as r
        on (p.userid = r.followedUserid ) where r.followerUserid = ? or p.userid = ?
        group by p.id
        order by p.createdAt desc`
        const values = userid? [userid]:[data.id,data.id]
        db.query(q, values, (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}
export const addPost = (req,res) =>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "insert into posts (`desc`,`img`,`userid`,`createdAt`)values(?)"
        const values = [
            req.body.desc,
            req.body.img,
            data.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
            
        db.query(q, [values], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json("帖子发布成功")
        })
    })
}
export const delPost = (req,res)=>{
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "delete from posts where `id` = ? and `userid` = ?"

        db.query(q, [req.query.postid,data.id], (err, data) => {
            if (err) res.status(500).json(err)
            if(data.affectedRows > 0)return res.status(200).json("删除帖子成功")
            return res.status(403).json("无权限")
        })
            
    })
}