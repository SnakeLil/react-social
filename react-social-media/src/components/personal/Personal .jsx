import React, { useState } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './personal.scss'
import { useSelector } from 'react-redux';
import { makeRequest } from '../../axios';
import Update from '../update/Update';

export default function Personal ({data}) {
  const [update,setUpdate] = useState(false)
console.log(data)
  const currentUser = useSelector(state=>state.auth).id
  const queryClient = useQueryClient()
  const { isLoading:followIsLoading, error, data:followData } = useQuery({
    queryKey: ['follow'],
    queryFn: () =>
    makeRequest.get(`relationships?followerUserid=${data.id}`).then(res=>{
        return res.data
    })
  })
  // console.log(followData)
  // console.log(followData?.includes(currentUser))

    const followMutation = useMutation(
          ()=>{
              return makeRequest.post(`/relationships?followedUserid=${data.id}`)
          },
        {
            onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['follow'] })
          },
        }
        );
    const unfollowMutation = useMutation(
          ()=>{
              return makeRequest.delete(`/relationships?followedUserid=${data.id}`)
          },
        {
            onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['follow'] })
          },
        }
        );
  const followHandle = ()=>{
    followMutation.mutate()
  }
  const unfollowHandle = ()=>{
    unfollowMutation.mutate()
  }
  const updateHandle = (e)=>{
    setUpdate(true)
  }
  return (
    <div className='personal'>
        <h3>{data?.name}</h3>
        <div className='icons'>
            <div className="itemS">
            <a href='ww'><FacebookIcon/></a>
            <a href='w'><TwitterIcon/></a>
            <a href='w'><InstagramIcon/></a>
            <a href='w'><WhatsAppIcon/></a>
            </div>
            <div className="itemM">
                <span><LocationOnIcon className='icon'/>{data?.city}</span>
                <span><LanguageIcon className='icon'/>{data?.website}</span>
            </div>
            <div className="itemE">
                <MailOutlineIcon className='icon'/>
                <MoreVertIcon className='icon'/>
            </div>
        </div>
        {followIsLoading?'Loading':
        currentUser === data?.id?
        <button onClick={updateHandle}>Update</button>:
        followData?.includes(currentUser)?
        <button onClick={unfollowHandle}>Unfollow</button>:
        <button onClick={followHandle}>Follow</button>}
        <img src={'/upload/'+data?.proFilePic}
        className='personPic'>
        </img>
        {update?<Update setUpdate={setUpdate} user={data}/>:null}
    </div>
  )
}
