// main.jsx or index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Pages & Components
import Home from './Pages/Home.jsx';
import Protected from './components/AuthLayout.jsx';
import AddPosts from './Pages/AddPosts.jsx';
import AllPosts from './Pages/AllPosts.jsx';
import EditPosts from './Pages/EditPosts.jsx';
import Post from './Pages/Post.jsx';
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';

// ✅ Define your routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/all-posts"
        element={
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected authentication={true}>
            <AddPosts />
          </Protected>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <Protected authentication={true}>
            <EditPosts />
          </Protected>
        }
      />
      <Route
        path="post/:slug"
        element={
          <Protected authentication={true}>
            <Post />
          </Protected>
        }
      />
    </Route>
  )
);

// ✅ Render your App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
