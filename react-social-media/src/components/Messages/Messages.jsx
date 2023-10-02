import React, { useEffect, useState } from 'react'
import './messages.scss'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser, makeRequest } from '../../axios';
export default function Messages({ message, Loading,friend }) {
  const friendProFilePic = friend?.proFilePic
  const [sent, setSent] = useState(false)
  // console.log(message)
  const { isLoading, error, data: currentData } = useQuery({
    queryKey: [''],
    queryFn: () =>
      getCurrentUser.get().then(res => {
        return res.data
      })
  })
  // console.log(currentData)
  // useEffect(()=>{
  //   if(message.userid === currentData[0].id){
  //     setSent(true)
  //   }else{
  //     setSent(false)
  //   }
  // },[message.userid,currentData])
  // console.log(sent)
  //判断当前用户与发送消息的用户id是否相等
  // 
  return (
    <div className='total' >
      {/* 对面 */}

      {Loading ? '' :
        <>
          {message.map(item=>(
            <div className={currentData[0].id === item.userid ?'messages-me':'messages'} key={item.id}>
            <div className='user'>
              <img src={currentData[0].id === item.userid ?'/upload/'+currentData[0].proFilePic:'/upload/'+friendProFilePic}
                alt="" />
            </div>
            <div className={currentData[0].id === item.userid ?'message-me':'message'}>
              <span>{item.message}</span>
            </div>
          </div>
          ))}

        </>}
    </div>
  )
}
