import React from 'react'
import './stories.scss'
import {useQuery} from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../axios'
import { addPost } from '../../redux/addPostSlice'
export default function Stories() {
    const user = useSelector(state => state.auth)
    const profilePic = user?.proFilePic
    const coverPic = user?.coverPic
    const username = user?.username
    const proPic = useSelector(state => state.proPic)
    const dispatch =useDispatch()
    const { isLoading, error, data } = useQuery({
      queryKey: [''],
      queryFn: () =>
      getCurrentUser.get().then(res=>{
          return res.data
      })
    })
    const stories = [
      {
        id: 1,
        name: 'Story 1',
        img: 'https://images.pexels.com/photos/18291237/pexels-photo-18291237.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      },
      {
        id: 2,
        name: 'Story 1',
        img: 'https://images.pexels.com/photos/18299752/pexels-photo-18299752.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      },
      {
        id: 3,
        name: 'Story 1',
        img: 'https://images.pexels.com/photos/18298942/pexels-photo-18298942.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      },

    ]
    const addPostHandle = (e)=>{
      e.stopPropagation()
      dispatch(addPost({transform: 'scale(1.15)'}))
    }
  return (
    <div className='stories'>
                {isLoading?'Loading':<div className='story' >
                    <img src={data[0].proFilePic?'/upload/'+data[0].proFilePic:proPic} alt='user' />
                    <span>{data[0].username}</span> 
                    <button className='addpost' onClick={addPostHandle}>+</button>   
                </div>}
        {stories.map(item=>{
            return (
                <div className='story' key={item.id}>
                    <img src={item.img} alt={item.name} />
                    <span>{item.name}</span>    
                </div>
            )
        })}
    </div>
  )
}
