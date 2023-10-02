import React, { useEffect } from 'react'
import './style.scss'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser, makeRequest } from '../../axios';
export default function Leftbar({ setChat,friends,getFriend,messages }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [''],
    queryFn: () =>
      getCurrentUser.get().then(res => {
        return res.data
      })
  })



  return (
    <div className='cleftbar'>
      {isLoading ? 'Loading' :
        <>
          <Navbar setChat={setChat} user={data[0]}/>
          <Search  user={data}/>
          <Chats  user={data} friends={friends} getFriend={getFriend} messages={messages}/>
        </>}
    </div>
  )
}
