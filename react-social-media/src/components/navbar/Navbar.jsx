import React, { useEffect, useState } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import  './navbar.scss'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setDark, setLight } from '../../redux/themeSlice';
import axios from 'axios';
import { removeUser } from '../../redux/authSlice';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { getCurrentUser } from '../../axios';
export default function Navbar(props) {
  const proPic = useSelector(state => state.proPic)

  const theme = useSelector(state => state.theme.theme.dark)
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const profilePic = user?.proFilePic
  const coverPic = user?.coverPic
  const username = user?.username
  const navgate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: [''],
    queryFn: () =>
    getCurrentUser.get().then(res=>{
        return res.data
    })
  })

  const logoutHanle = async()=>{
    try{
      const res = await axios.post('http://localhost:8800/api/auth/logout',{
        withCredentials:true
      })
      setTimeout(() => {
        navgate('/login')
      }, 1200);
      dispatch(removeUser())
    }catch(err){
      console.log(err.response.data)
    }

  }

  return (
    <div className='navbar'>
        <div className='left'>
          <Link to='/'><span className='logo'>Lilsnake</span></Link>
          <HomeOutlinedIcon className='icon gohome'/>
          {
            theme?<LightModeOutlinedIcon
             className='icon' 
            onClick={()=>{
            dispatch(setLight())
            
            }}/>
            :<DarkModeOutlinedIcon 
            className='icon' 
            onClick={()=>{
              dispatch(setDark())
            }}/>
          }
          
          <GridViewOutlinedIcon className='icon'/>
          <div className='search'>
            <SearchOutlinedIcon className='icon'/>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className='right'>
          <span onClick={logoutHanle} style={{cursor:'pointer'}}>退出</span>
          <PersonOutlinedIcon className='icon personicon'/>
          <MailOutlineOutlinedIcon className='icon'/>
          <NotificationsNoneOutlinedIcon className='icon'/>
          {isLoading?'Loading':<div className='user'>
            {isLoading?'Loading':<Link to={'/profile/'+data[0]?.id}><img src={data[0].proFilePic?'/upload/'+data[0].proFilePic:proPic}
             alt="user" />
            <span>{data?.name}</span></Link>}
          </div>}
        </div>
    </div>
  )
}
