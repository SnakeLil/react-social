import React from 'react'
import './RightBar.scss'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import RefreshIcon from '@mui/icons-material/Refresh';
export default function RightBar() {
  const { isLoading, error, data,refetch  } = useQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      makeRequest.get(`recommend`).then(res => {
        return res.data
      })
  })

  const refreshHandler = () =>{
    refetch()
  }

  return (
    <div className='rightbar'>
      <div className="container">
        {/* first item */}
        {isLoading ? 'Loading' :
          <div className="item">
            <span className='title'>Recommended For Fou</span>
            {data.map(item => (<div className="user" key={item.id}>
              <div className="info">
                <img src={'/upload/' + item.proFilePic}
                  alt="user" />
                <span>{item.name}</span>
              </div>
              <div className="btns">
                <button className='fol'>follow</button>
                <button className='mis'>dismiss</button>
              </div>
              
            </div>))
            
            }
          <RefreshIcon className='refresh' onClick={refreshHandler}/>
          </div>}
        {/* 1 end */}
        <div className="item">
          <span className='title'>Latest Activities</span>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <span className='status'>liked a post</span>
            </div>
            <div className="btns">
              <span>1 min ago</span>
            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <span className='status'>changed their cover picture</span>
            </div>
            <div className="btns">
              <span>1 min ago</span>
            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <span className='status'>liked & comment</span>
            </div>
            <div className="btns">
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        {/* 2 end */}
        <div className="item">
          <span className='title'>Online Friends</span>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <i className='online'></i>
            </div>
            <div className="btns">

            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <i className='online'></i>
            </div>
            <div className="btns">

            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <i className='online'></i>
            </div>
            <div className="btns">

            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <i className='online'></i>
            </div>
            <div className="btns">

            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <i className='online'></i>
            </div>
            <div className="btns">

            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="https://images.pexels.com/photos/18096922/pexels-photo-18096922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="user" />
              <span>username</span>
              <i className='online'></i>
            </div>
            <div className="btns">

            </div>
          </div>
        </div>
        {/* 3 end */}
      </div>
    </div>
  )
}
