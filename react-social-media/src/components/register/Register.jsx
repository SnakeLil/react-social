import React, { useState } from 'react'
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../redux/api/authApi'
export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [register,  {isError,isLoading,isSuccess}] = useRegisterMutation()
  const [color,setColor] = useState('')
  const user = {
    username: username,
    email: email,
    password: password,
    name: name
  }
  const [err,setErr] = useState('')
  const navgate = useNavigate()
  const registerHandler = async (e)=>{
    e.preventDefault()
    if(!username || !email || !password || !name){
      //填写不完整
      console.log('请填写完整信息')
      setErr('请填写完整信息')
      return
    }
    try{
      register(user).unwrap().then(res=>{
        console.log(res.message)
        setErr(res.message)
        setColor('green')
        setTimeout(() => {
          navgate('/login')
        }, 1200);
      })
    }catch(err){
      console.log(err)
      setErr(err)
    }

    console.log(isError,isLoading,isSuccess)
  }
  return (
    <div className='register'>
      <div className="card">
        <div className="right">
          <h2>Register</h2>
          <form>
            <input type="text" value={username} name='username' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>

            <input type="email" value={email} name='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>

            <input type="password" value={password} name='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>

            <input type="text" value={name} name='name' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
            
            <button onClick={registerHandler}>Register</button>
            <p className='tip' style={{color:`${color}`}}>{err}</p>
          </form>

        </div>
        <div className="left">
          <h1>Wel lilsnake.</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur error nesciunt suscipit deserunt nostrum facere officia quo eaque unde reprehenderit dolorem.</p>
          <span>Do you have an account?</span>
          <Link to='/login'><button>Login</button></Link>
        </div>
      </div>
    </div>
  )
}
