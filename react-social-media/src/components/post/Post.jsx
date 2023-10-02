import React, { useState } from 'react'
import './post.scss'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useSelector } from 'react-redux';
import moment from 'moment'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { getCurrentUser, makeRequest } from '../../axios'
export default function Post(props) {
    const proPic = useSelector(state => state.proPic)
    const post = props.post
    const currentUser = useSelector(state=>state.auth).id
    const like = true
    const [commentOpen,setCommentOpen] = useState(false)
    const [islike,setIsLike] = useState(false)
    const [more,setMore] = useState(false)
    const { isLoading, error, data } = useQuery({
        queryKey: ['likes',post.id],
        queryFn: () =>
        makeRequest.get(`likes?postid=${post.id}`).then(res=>{
            return res.data
        })
      })
      const {  data:cdata } = useQuery({
        queryKey: ['comments',post.id],
        queryFn: () =>
        makeRequest.get(`comments?postid=${post.id}`).then(res=>{
            return res.data
        })
      })
      const [commentsAccount,setComments] = useState(0)

      const queryClient = useQueryClient()
  
      const likeMutation = useMutation(
          (likeid)=>{
              return makeRequest.post('/likes',likeid)
          },
        {
            onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['likes'] })
          },
        }
        );
      const delMutation = useMutation(
          ()=>{
              return makeRequest.delete(`/likes?postid=${post.id}`)
          },
        {
            onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['likes'] })
          },
        }
        );
        const delPostMutation = useMutation(
            ()=>{
                return makeRequest.delete(`/posts?postid=${post.id}`)
            },
          {
              onSuccess: () => {
              // Invalidate and refetch
              queryClient.invalidateQueries({ queryKey: ['posts'] })
            },
          }
          );
      const disLikeHandle = ()=>{
        if(data?.includes(currentUser)){
            delMutation.mutate()
        }
      }
      const likeHandle = ()=>{
        if(data?.includes(currentUser)){
            return
        }
        likeMutation.mutate({postid:post.id})
      }


      const moreHandler = ()=>{
        setMore(true)
      }
      const delPostHandler =()=>{
        delPostMutation.mutate()
      }
      const { isLoading:load, error:err, data:CurrentUser } = useQuery({
        queryKey: [''],
        queryFn: () =>
        getCurrentUser.get().then(res=>{
            return res.data
        })
      })


    return (
        <div className={post.img ? 'post' : 'text'}>
            {load?'Loading':<><div className="userinfo">
                <div className="user">
                    <img src={post.proFilePic?'/upload/'+post.proFilePic:proPic} alt="" />
                    <Link to={`/profile/${post.userid}`}>
                        <div className='name'>
                            <span className='uname'>{post.name}</span>
                            <span className='time'>{post.createdAt?moment(post.createdAt).fromNow():''}</span>
                        </div>
                    </Link>

                </div>
                <MoreHorizOutlinedIcon className='more' onClick={moreHandler}/>
                {/* 删除列表 */}
                {more?<div className='moreList'>
                    {post.userid === CurrentUser[0].id?<><span onClick={delPostHandler}>delete</span>
                    <span>modify</span></>:null}
                    <span>share</span>
                    <button onClick={()=>{setMore(false)}}>x</button>
                </div>:''}
            </div>
            <p className='desc'>{post.desc}</p>
            {post.img ? <div className="img">
                <img src={post.img?'../upload/'+post.img:''} alt={post.img} />
            </div> : null}
            <div className="btm">
                <div className="item">
                    {
                        data?.includes(currentUser) ? <FavoriteOutlinedIcon className='icon' style={{ color: '#c0392b' }} onClick={disLikeHandle}/>
                            :
                            <FavoriteBorderOutlinedIcon className='icon' onClick={likeHandle}/>
                    }
                    <span >{data?.length} likes</span>
                </div>
                <div className="item"onClick={()=>{setCommentOpen(pre=>!pre)}
                    } >
                    <ChatOutlinedIcon className='icon'
                    />
                    <span>{cdata?.length} comments</span>
                </div>
                <div className="item">
                    <ShareOutlinedIcon className='icon' />
                    <span>share</span>
                </div>
            </div>
            {commentOpen?<Comments postid={post.id}></Comments>:null}</>}

        </div>
    )
}
