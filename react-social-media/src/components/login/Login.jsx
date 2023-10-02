import React, { useState } from 'react'
import './Login.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/authApi'
import { setUser } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = {username:username,password:password}
  const [login,data] = useLoginMutation()
  const [err,setErr] = useState('')
  const [color,setColor] = useState('')
  const dispatch = useDispatch()
  const navgate = useNavigate()
  const param = useParams()

  const loginHanler = async (e)=>{
    e.preventDefault()

    try{
      const res = await axios.post('http://localhost:8800/api/auth/login',user,{
        withCredentials:true
      })
      dispatch(setUser(res.data))
      setErr('登录成功')
      setColor('green')
      setTimeout(() => {
        navgate('/')
      }, 1200);
    }catch(err){
      console.log(err.response?.data)
      setErr(err?.response?.data)
      setColor('red')
    }


    // try{
    //   await login(user).unwrap()
    //   .then(res=>{
    //     dispatch(setUser(res))

    //     setErr('登录成功')
    //     //登录成功将服务器返回的cookie存储到浏览器中
       
        
    //     setColor('green')
    //   })
    // }catch(err){
    //   console.log(err)
    //   setErr(err?.data)
    //   setColor('red')
    // }
  }
  return (
    <div className='login'>
        <div className="card">
          <div className="left">
            <h1>Hello Login.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur error nesciunt suscipit deserunt nostrum facere officia quo eaque unde reprehenderit dolorem.</p>
            <span>Dont't you have an account?</span>
            <Link to='/register'><button>Register</button></Link>
          </div>
          <div className="right">
            <h2>Login</h2>
            <form>
            <input type="text" value={username} name='username' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="password" value={password} name='password'placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={loginHanler}>login</button>
            {err && <p style={{color:`${color}`}}>{err}</p>}
            </form>

          </div>
        </div>
    </div>
  )
}
