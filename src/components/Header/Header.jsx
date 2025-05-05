import React from 'react'
import Container from '../Container/Container.jsx'
import { Logo } from '../index.js'
import LogoutBtn from './logoutBtn.jsx'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  const navigate = useNavigate()

  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md">
      <Container>
        <nav className="flex flex-wrap items-center justify-between py-4 gap-y-4">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex flex-wrap items-center ml-auto gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-5 py-2 rounded-full text-sm font-medium bg-gray-700 hover:bg-gray-600 hover:text-white transition duration-200 border border-gray-600 hover:border-gray-400"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
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