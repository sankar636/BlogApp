import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then( () => {
            dispatch(logout())
        })
    }
  return (
    <div 
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >
    Logout
    </div>
  )
}

export default LogoutBtn