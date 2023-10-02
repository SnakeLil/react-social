import React, { useCallback, useEffect } from 'react'
import './Home.scss'
import { Outlet, useLocation, useParams  } from 'react-router'
import Leftbar from '../leftbar/Leftbar'
import RightBar from '../rightBar/RightBar'
import Footer from '../footer/Footer'


export default function Home({clickHandle}) {
  //登录页面跳转过来时自动刷新
  // window.location.reload(true);

  return (
    <div className='home' onClick={clickHandle}>
      
      <div className='main'>
        
        <Leftbar></Leftbar>
        {/* <div className='middle'>
          <Stories></Stories>
          <Posts></Posts>
        </div> */}
        <Outlet />
        <RightBar></RightBar>
      </div>
      <Footer></Footer>
    </div>
  )
}
