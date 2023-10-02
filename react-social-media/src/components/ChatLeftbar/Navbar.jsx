import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
export default function Navbar({setChat,user}) {
  return (
    <div className='navbar'>
      <span>CHAT</span>
      <div className='user'>
        <img src={'/upload/'+user. proFilePic} alt="" />
        <Link to='/'>{user.name}</Link>
        <button onClick={()=>setChat(false)}>close</button>
        </div>
    </div>
  )
}
