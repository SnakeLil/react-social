import React, { useState } from 'react'
import  './Leftbar.scss'
import GroupIcon from '@mui/icons-material/Group';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../axios';
import ChatIcon from '@mui/icons-material/Chat';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Link } from 'react-router-dom';
import ChatPage from '../chatPage/ChatPage';
export default function Leftbar(props) {

  const [chat,setChat] = useState(false)
  const { isLoading, error, data } = useQuery({
    queryKey: [''],
    queryFn: () =>
    getCurrentUser.get().then(res=>{
        return res.data
    })
  })
  const openChatHanler = ()=>{
    setChat(true)
  }
  return (
    <div className='leftbar'>
      {chat?<ChatPage setChat={setChat}/>:null}
        <div className='container'>
        <div className="item">
                <Link to='/'>
                {isLoading?'Loading':<div className="item-span user">
                    <img src={'/upload/'+data[0].proFilePic} alt="" />
                    <span>{data[0]?.name}</span>
                </div>}

                </Link>
            </div>
            <div className="item">

                <div className="item-span" onClick={openChatHanler}>
                    <ChatIcon className='icon'/> 
                    <span>chat</span>
                </div>
                <div className="item-span">
                    <VideogameAssetIcon className='icon'/> 
                    <span>game</span>
                </div>


            </div>
            
            <div className="item">

              <div className="item-span">
                    <MusicVideoIcon className='icon'/> 
                    <span>Music</span>
                </div>
                <div className="item-span">
                    <OndemandVideoIcon className='icon'/> 
                    <span>Video</span>
                </div>
            </div>
            <div className="item">

              <div className="item-span">
                    <OtherHousesIcon className='icon'/> 
                    <span>My home</span>
                </div>
              <div className="item-span">
                    <SettingsApplicationsIcon className='icon'/> 
                    <span>Setting</span>
                </div>

            </div>
        </div>
        
    </div>
  )
}
