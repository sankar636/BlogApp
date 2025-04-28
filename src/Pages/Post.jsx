import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import service from '../appwrite/config.js'
import  Button  from '../components/Button.jsx'
import Container from '../components/Container/Container.jsx'


const Post = () => {
  // state to handel the post
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  // grab the user data
  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if(slug){
      service.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        }else{
          navigate('/')
        }
      })
    }
  },[slug, navigate])

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage)
        useNavigate('/')
      }
    })
  }
  return post ? (
    <div>
      <Container>
        <div>
          <img src={service.getFilePreview(post.featuredImage)} alt={post.title} />
          {isAuthor && (
            <div>
              <Link to={`/EditPosts/${post.$id}`}>
                <Button>
                  Edit
                </Button>
              </Link>
              <Button onclick={deletePost()}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div>
          <h2>{post.title}</h2>
          <div>{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post

// how database store the post (haml react parser) ---> it make(i.e parse) the post(make by tinymce) into html format and then store it in database in text format 