import { StrictMode } from 'react'
import React from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


import Home from './Pages/Home.jsx'
import Protected from './components/AuthLayout.jsx'
import AddPosts from './Pages/AddPosts.jsx'
import AllPosts from './Pages/AllPosts.jsx'
import EditPosts from './Pages/EditPosts.jsx'
import Post from './Pages/Post.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
// import Login from './components/Login.jsx'
// import SignUp from './components/SignUp.jsx'

const router = createBrowserRouter(
  // createRoutesFromElements(
  //   <Route path='/' element={<App />}>
  //     <Route path='/' element={<Home/>}></Route>
  //     <Route path='/add-post' element={<AddPosts/>}></Route>
  //     <Route path='/all-posts' element={<AllPosts/>}></Route>
  //     <Route path='/EditPosts' element={<EditPosts/>}></Route>
  //     <Route path='/login' element={<Login/>}></Route>
  //     <Route path='/signup' element={<SignUP/>}></Route>
  //     <Route path='/post' element={<Post/>}></Route>
  //   </Route>
  // )
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: (
            <Protected authentication={false}>
              <Login />
            </Protected>
          )
        },
        {
          path: "/signup",
          element: (
            <Protected authentication={false}>
              <SignUp />
            </Protected>
          )
        },
        {
          path: "/all-posts",
          element: (
            <Protected authentication>
              <AllPosts />
            </Protected>
          )
        },
        {
          path: "/add-post",
          element: (
            <Protected authentication>
              <AddPosts />
            </Protected>
          )
        },
        {
          path: "/edit-post/:slug",
          element: (
            <Protected authentication>
              <EditPosts />
            </Protected>
          )
        },
        {
          path: "/post/:slug",
          element: (
            <Protected authentication>
              <Post />
            </Protected>
          )
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
