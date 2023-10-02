import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Leftbar from '../ChatLeftbar/Leftbar'
import Chat from '../chat/Chat'
import './ChatPage.scss'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser, makeRequest } from '../../axios';
export default function ChatPage({setChat}) {
    const [user,setUser ] = useState(null)
    const [messages,setMessages ] = useState(null)
    const [lastMessage,setLastMessage]  = useState(null)
    const { isLoading:Loading, error:Error, data:Data } = useQuery({
        queryKey: ['friends'],
        queryFn: () =>
        makeRequest.get(`chat/friends`).then(res=>{
            return res.data
        })
      })
      const getFriend = (user) =>{
            setUser(user)
      }
      const getMessages = (messages) =>{
        if(messages) {
          setMessages(messages)
          console.log(messages)
          // setLastMessage(messages)
      }
      }
      
      
    const overInput = document.getElementById('chat') //获取根元素
  return ReactDOM.createPortal(
        <div className='chatpage'>
        <div className="container">
           {Loading?'Loading':
           <>
           <Leftbar setChat={setChat} friends={Data} getFriend={getFriend} messages={messages}/>
           <Chat friends={Data} friend= {user} setMessages={getMessages}/>
           </>
           }
        </div>
    </div>, overInput)

  
}
