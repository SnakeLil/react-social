import React, { useEffect, useState } from 'react'
import './chat.scss'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Messages from '../Messages/Messages'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser, makeRequest } from '../../axios';

export default function Chat({friend,setMessages}) {
  const [message, setMessage] = useState('')
  const { isLoading, error, data:currentData } = useQuery({
    queryKey: [''],
    queryFn: () =>
      getCurrentUser.get().then(res => {
        return res.data
      })
  })

  const queryClient = useQueryClient()

  const sendMutation = useMutation(
      ()=>{
          return makeRequest.post('chat/messages',{
            friendid:friend?.id,
            message:message
          })
      },
    {
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['chat',friend?.id,currentData[0].id] })
      },
    }
    );

  const { isLoading:sLoading, error:sError, data:sData } = useQuery({
    queryKey: ['chat',friend?.id,currentData[0].id],
    queryFn: () =>
      makeRequest.get(`chat/messages?friendid=${friend?.id}`).then(res => {
        return res.data
      })
  })
  const { isLoading:aLoading, error:aError, data:aData } = useQuery({
    queryKey: ['allMessage',],
    queryFn: () =>
      makeRequest.get(`chat/allMessages`).then(res => {
        return res.data
      })
  })

    useEffect(()=>{
      setMessages(aData)
    },[aData])
    const sendHandler = async()=>{
      if(message.trim() === '') {
        console.log('不能发送空消息')
        return
      }
      try{
        const res = await sendMutation.mutateAsync()
        setMessage('')
      }catch(err){
        console.log(err)
      }
    }

 
  return (
    <div className='chat'>
      <div className='chat-header'>
        <span>username</span>
        <div className='more'>
            <VideocamIcon className='icon'/>
            <PersonIcon className='icon'/>
            <MoreHorizIcon className='icon'/>
        </div>
      </div>
      <div className='chat-body'>
         {sLoading?'Loading': 
         <Messages message={sData} Loading={sLoading} friend={friend}/>
         }
      </div>
      <div className='chat-input'>
        <input type='text' placeholder='Type a message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <div className='input-right'>
          <InsertEmoticonIcon className='icon'/>
          <ImageIcon className='icon'/>
          <LinkIcon className='icon'/>
        <button onClick={sendHandler}>Send</button>
        </div>
        
      </div>
    </div>
  )
}
