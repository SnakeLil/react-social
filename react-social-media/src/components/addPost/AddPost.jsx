import React, { useState } from 'react'
import './addPost.scss'
import { getCurrentUser, makeRequest } from '../../axios'
import ImageIcon from '@mui/icons-material/Image';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useSelector } from 'react-redux';
import {useMutation,useQueryClient,useQuery} from '@tanstack/react-query'
export default function AddPost() {
    const proPic = useSelector(state => state.proPic)
    const user = useSelector(state => state.auth)
    const profilePic = user?.proFilePic
    const coverPic = user?.coverPic
    const username = user?.username
    const [desc,setDesc] = useState('')
    const [file,setFile] = useState(null)
    const { isLoading, error, data } = useQuery({
        queryKey: [''],
        queryFn: () =>
        getCurrentUser.get().then(res=>{
            return res.data
        })
      })
    const upload = async()=>{
        try{
            const formData = new FormData()
            formData.append('file',file)
            const res =await makeRequest.post('upload',formData)
            return res.data
            
        }catch(err){
            console.log(err)
        }
    }
    
    
    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newPost)=>{
            return makeRequest.post('/posts',newPost)
        },
      {
          onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
      }
      );

    const handleClick = async (e)=>{
        e.preventDefault()
        let imgUrl = ''
        if(file) imgUrl = await upload()
        mutation.mutate({desc:desc,img:imgUrl})
        setDesc('')
        setFile(null)
    }
    const transform = useSelector(state=>state.addPost)
   console.log(transform)
    return (
        <div className='addPost' style={transform?transform:{}}>
            <div className='addtop'>
                <div className='addleft'>

                {isLoading?'Loading':<>
                <img src={data[0].proFilePic?'/upload/'+data[0].proFilePic:proPic} alt="" />
                <span className='tip'>What's on your mind {data[0].name} ?</span>
                </>}
                </div>
                <div className='addright'>
                    {file?<span className='close'>x</span>:''}
                    {file?<img src={URL.createObjectURL(file)}/>:''}
                </div>
            </div>
            <div className='addmiddle'>
                <input type="text" name='desc'value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            </div>
            <div className='addbtm'>
                <div className='left'>
                    <input type="file" id='file'name='file' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                    <label htmlFor="file">
                    <div className="additem">
                        <ImageIcon fontSize='small'/>
                        <span>Add Img</span>
                    </div>
                    </label>

                    <div className="additem">
                        <PinDropIcon fontSize='small'/>
                        <span> Add place</span>
                       </div>
                    <div className="additem">
                        <AlternateEmailIcon fontSize='small'/>
                        <span>Tag friends</span>
                    </div>
                </div>
                
                <button onClick={handleClick}>share</button>
                

            </div>
        </div>
    )
}
