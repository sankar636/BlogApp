import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


import Home from './Pages/Home.jsx'
import AddPosts from './Pages/AddPosts.jsx'
import AllPosts from './Pages/AllPosts.jsx'
import EditPosts from './Pages/EditPosts.jsx'
import Post from './Pages/Post.jsx'
// import Login from './Pages/Login.jsx'
// import SignUp from './Pages/SignUp.jsx'
import Login from './components/Login.jsx'
import SignUP from './components/SignUp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/add-post' element={<AddPosts/>}></Route>
      <Route path='/all-posts' element={<AllPosts/>}></Route>
      <Route path='/EditPosts' element={<EditPosts/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUP/>}></Route>
      <Route path='/post' element={<Post/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter>
      </BrowserRouter> */}
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
