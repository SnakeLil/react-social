import React, { useEffect } from 'react'
import Home from '../../components/home/Home'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import { getCurrentUser } from '../../axios'
import {useQuery} from '@tanstack/react-query'
import { addPost } from '../../redux/addPostSlice'
export default function HomePgae(props) {
  const navgate= useNavigate()
  const currentUser = useSelector(state => state.auth)
  const { isLoading, error, data } = useQuery({
    queryKey: ['follow'],
    queryFn: () =>
    getCurrentUser.get().then(res=>{
        return res.data
    })
  })
  useEffect(()=>{
    if(!currentUser){
      navgate('/login')
    }
  },[currentUser])
  const dispatch = useDispatch()
  const clickHandle = ()=>{
    dispatch(addPost({transform: 'scale(1)'}))
  }
  return (
    <>
    <Navbar data={data}></Navbar>
    <Home clickHandle={clickHandle}></Home>
    </>
  )
}
