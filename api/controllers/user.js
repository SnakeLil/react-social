import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken" 
export const getUser = (req, res) =>{
    //todo
    const userId  = req.params.userId;
    // console.log(userId)
    const q = 'select * from users where id = ?'
    db.query(q,[userId],(err,data)=>{
        if(err) return res.status(500).json(err)
        console.log(data)
        const {password, ...info} = data[0]
        return res.json(data[0])
    })
}
export const getPost = (req, res) =>{
    //todo
    const userId  = req.params.userId;
    // console.log(userId)
    const q = 'select posts.*,users.name,users.proFilePic from posts join users on posts.userid = users.id where userid = ?'
    db.query(q,[userId],(err,data)=>{
        if(err) return res.status(500).json(err)
        // console.log(data)
        // const {password, ...info} = data[0]
        return res.json(data)
    })
}
export const getCurrentUser = (req, res) =>{
    //todo
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = "select * from users where id = ?"

        db.query(q, [data.id], (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    })

}
export const updateUser = (req, res) =>{
    //todo
    const token = req?.cookies?.accessToken
    if (!token) return res.status(401).json('not logged in');
    jwt.verify(token, "secrekey", (err, data) => {
        if (err) return res.status(403).json('token 无效')
        const q = `update users 
        set name = ?,coverPic = ?,proFilePic = ?,city = ?,website = ?
        where id = ?`
        const values = [req.body.name,req.body.coverPic,req.body.proFilePic,req.body.city,req.body.website]
        db.query(q, [...values,data.id], (err, data) => {
            if (err) res.status(500).json(err)
            if(data.affectedRows >0) return res.status(200).json('修改成功')
            return res.status(403).json('无权限')
        })
    })

}