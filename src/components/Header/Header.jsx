import React from 'react'
import Container from '../Container/Container.jsx'
import Logo from '../Logo.jsx'
import LogoutBtn from './logoutBtn.jsx'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    }
  ]
  const navigate = useNavigate()
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'> 
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? ( 
            <li key={item.name}>
              <button
              onClick={() => navigate(item.slug)}
              className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >
                {item.name}
              </button>
            </li> ) : null
            )}
            {/* to show login or logout button */}
            {authStatus && (
              <li >
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

// Why check state.auth.status?
// → Because status is stored inside authSlice, and Redux state is structured as state.auth.status.