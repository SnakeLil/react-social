import moment from "moment";
import { db } from "../connect.js"
import jwt from "jsonwebtoken"
export const getRecUser = (req,res)=>{
        const q = `select id,name,proFilePic from users ORDER BY RAND() LIMIT 3  `;
        db.query(q, (err, data) => {
            if (err) res.status(500).json(err)
            return res.status(200).json(data)
        })
    
}
