import React, { useState } from 'react'
import './Update.scss'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
export default function Update({ setUpdate, user }) {
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [text, setText] = useState({
        name: '',
        city: '',
        website: '',
    })
    const upload = async (file) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await makeRequest.post('upload', formData)
            return res.data

        } catch (err) {
            console.log(err)
        }
    }

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (user) => {
            return makeRequest.put('/users', user)
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: ['user'] })
            },
        }
    );


    const changeHandler = (e) => {
        setText((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        let coverPic 
        let profilePic 
        coverPic = cover ?await upload(cover): user.coverPic
        profilePic = profile ? await upload(profile):user.proFilePic
        mutation.mutate({
            ...text,
            coverPic: coverPic,
            proFilePic: profilePic
        })
        setUpdate(false)
    }
    return (
        <div className='update'>

            <form action="" className='updateForm'>
                <div className='item'>
                    <span>cover: </span>
                    <input type="file" onChange={(e)=>setCover(e.target.files[0])}/>
                    {cover?<img src={cover?URL.createObjectURL(cover):''} alt="" />:''}
                </div>
                <div className='item'>
                    <span>profile: </span>
                    <input type="file" onChange={(e)=>setProfile(e.target.files[0])}/>
                    {profile?<img src={cover?URL.createObjectURL(profile):''} alt="" />:''}
                </div>
                <div className='item'><span>name: </span><input type="text" name='name' value={text.name} onChange={changeHandler} /></div>
                <div className='item'><span>city: </span> <input type="text" name='city' value={text.city} onChange={changeHandler} /></div>
                <div className='item'><span>website: </span><input type="text" name='website' value={text.website} onChange={changeHandler} /></div>
                <button onClick={submitHandler}>Submit</button>
            </form>
            <span onClick={() => { setUpdate(false) }} className='close'>x</span>
        </div>
    )
}
