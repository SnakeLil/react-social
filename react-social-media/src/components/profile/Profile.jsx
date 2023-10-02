import React, { useState } from 'react'
import './Profile.scss'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import Posts from '../posts/Posts';
import Personal from '../personal/Personal ';
import { useLocation } from 'react-router';
export default function Profile() {

  const location = useLocation().pathname
  const userId = location.split('/')[2]
  // console.log(userId)
  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
    makeRequest.get(`users/find/${userId}`).then(res=>{
        return res.data
    })
  })
console.log(data)
  return (
    <div className='profile'>
      {isLoading?'Loading':<>
      <img src={'/upload/'+data?.coverPic} className='cover'></img>
      
      <Personal data={data} />
      <Posts user={data}/></>}
    </div>
  )
}
