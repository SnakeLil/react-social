import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePgae from './pages/home/HomePgae';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import Navbar from './components/navbar/Navbar';
import { useState } from 'react';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import Stories from './components/stories/Stories';
import Posts from './components/posts/Posts';
import AddPost from './components/addPost/AddPost';
import {QueryClient,QueryClientProvider,useQuery,} from '@tanstack/react-query'

function App() {
  const [user, setUser] = useState(true);
  const theme = useSelector(state => state.theme.theme.dark)
  const home =<div className='middle'><Stories></Stories><AddPost/><Posts></Posts></div>
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <div className={theme ? 'theme-dark' : null}>

        <Routes>
          <Route path='/' element={<HomePgae user={user} />} >
            <Route path='/' element={home}>
            </Route>
            <Route path='/profile/:id' element={<ProfilePage />}></Route>
          </Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          {/* <Route path='/profile:id' element={<ProfilePage/>}></Route> */}
        </Routes>

      </div>
    </div>
    </QueryClientProvider>
  );
}

export default App;
