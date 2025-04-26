import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth.js'
import {login, logout} from './store/authSlice.js'
import { Outlet } from 'react-router-dom'
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import { Header,Footer } from './components/index.js'
function App() {

  // console.log(import.meta.env.VITE_APPWRITE_URL);  
  // console.log(document.cookie,"Document"); // check if session cookie exists
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).catch((error) => {
      console.error("No logged in user", error);
      dispatch(logout())
    }).finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  // return (
  //   <>
  //     <h1>hello world</h1>
  //    </>
  // )
}

export default App
