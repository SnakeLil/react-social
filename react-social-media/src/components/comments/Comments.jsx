import React, { useState } from 'react'
import './comments.scss'
import { Link } from 'react-router-dom'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import moment from 'moment'
import { useSelector } from 'react-redux'

export default function Comments(props) {
    const user = useSelector(state => state.auth)
    const proPic = useSelector(state => state.proPic)

    const [desc,setDesc] = useState('')
    const postid = props.postid

    const { isLoading, error, data } = useQuery({
        queryKey: ['comments',postid],
        queryFn: () =>
        makeRequest.get(`comments?postid=${postid}`).then(res=>{
            return res.data
        })
      })
      console.log(data)
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newComments)=>{
            return makeRequest.post('/comments',newComments)
        },
      {
          onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['comments',postid] })
        },
      }
      );
      const handleClick = async (e)=>{
        e.preventDefault()

        mutation.mutate({desc:desc,postid:postid})
        setDesc('')
    }

    return (
        <div className='comments'>
            <div className='write'>
            <img src={user. proFilePic?'/upload/'+user. proFilePic: proPic}
             alt={user.name}/>{user.name}
             <input type="text" value={desc} placeholder='write a comment' onChange={(e)=>setDesc(e.target.value)}/>
             <button onClick={handleClick}>send</button>
            </div>
            {
              isLoading?'isLoading' :  data.map(item => {
                    return (
                        <div className='comment' key={item.id}>
                            <div className='uinfo'>
                                <img src={item.profilePic?'/upload/'+item.profilePic:proPic} alt={item.name} />
                                <div className="info">
                                    <Link to={`profile/${item.userid}`}><span>{item.name}</span></Link>
                                    <p>{item.desc}</p>
                                </div>
                            </div>

                            <span className='time'>{moment(item.createdAt).fromNow()}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
