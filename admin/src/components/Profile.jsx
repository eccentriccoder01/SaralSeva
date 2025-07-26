import React, { useContext } from 'react'
import { AdminContext } from './context/adminContext'

const Profile = () => {
    const {admin} = useContext(AdminContext)
  return (
    <div>
      <h1 className='text-2xl'>Profile Section</h1>
      <div className='flex flex-col items-center gap-3 lg:flex-row lg-justify-center'>
        <img src={admin?.profilePic} alt="" className='rounded-full w-60 h-60' />
       <div>
          <p>Name: {admin?.name}</p>
          <p>Employee ID: {admin?.adminId}</p>
          <p>Email: {admin?.email}</p>
          <p>Phone: {admin?.mobile}</p>
       </div>
      </div>
    </div>
  )
}


export default Profile
