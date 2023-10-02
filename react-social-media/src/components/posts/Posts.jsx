import React from 'react'
import './posts.scss'
import Post from '../post/Post'
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { useLocation } from 'react-router'
export default function Posts({user}) {
console.log(user?.id)
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts',user?.id],
        queryFn: () =>
        makeRequest.get(user?.id?`/posts?userid=${user?.id}`:`/posts`).then(res=>{
            return res.data
        })
      })
      
console.log(data)

    //   console.log(bool)


    return (
        <div className='posts'>
            {error?'Something Error!'
            :(isLoading?'Loading...'
               : data?.map(item => {
                    return (
                        <Post key={item.id} post={item} user={user}></Post>
                    )

                })
                )
                
            }
            
        </div>
    )
}
