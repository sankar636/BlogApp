import React from 'react'
import Container from "../components/Container/Container.jsx"
import PostForm from '../components/PostForm.jsx'

function AddPosts() {
  // console.log("Post Added");
  
  return (
    <div className='py-6'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPosts