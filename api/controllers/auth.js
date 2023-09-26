import { db } from "../connect.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//注册
export const register = (req, res) => {
    //检查用户是否已经存在
    const q = 'select * from users where username = ?'
    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(200).json(err)
        if(data.length) return res.status(209).json({message:'用户已存在',exist: true})

        //如果不存在则注册成功
        const salt = bcrypt.genSaltSync(10) //对密码进行哈希处理的方法
        const hashPassword = bcrypt.hashSync(req.body.password, salt) //使用上述方法，得到哈希处理后的密码hashPassword
        const q = 'insert into users (`username`,`password`,`email`,`name`) value (?)'
        const values = [req.body.username, hashPassword, req.body.email, req.body.name]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err)
            res.status(200).json({
                message: '注册成功',
                data: {                
                    username: req.body.username,
                    email: req.body.email,
                    name: req.body.name,
                    isSuccess: true
                }
                })
        })
    })

}

//登录
export const login = (req, res) => {

    //检查是否有该用户，没有则返回用户不存在
    const q = 'select * from users where username = ?'
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(!data.length) return res.status(404).json('用户不存在')
        //检查密码是否正确
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if(!checkPassword) return res.status(400).json('用户名或密码错误')
        //jwt
        const {password,...others} = data[0]
        const token = jwt.sign({id:data[0].id},"secrekey")
        res.cookie('accessToken',token,{
            httpOnly:true,
        }).status(200).json(others)
    })
}

//登出
export const logout = (req, res) => {
    res.clearCookie('accessToken',{
        secure:true,
        sameSite:'none'
    }).status(200).json('登出成功')

}