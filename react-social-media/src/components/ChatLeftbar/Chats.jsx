import React from 'react'

export default function Chats({friends,getFriend,messages}) {
  console.log(messages)
  console.log(friends)
  return (
    <div className='chats'>

      {friends.map(item=>(
        <div className="item" onClick={()=>getFriend(item)} key={item.id}>
        <img src={'/upload/'+item.proFilePic} alt="" />
        <div className="left">
          <h3>{item.name}</h3>
          <span>{item.id===messages?.friendid ? messages?.message:''}</span>
        </div>
      </div>
      ))}

      
    </div>
  )
}
