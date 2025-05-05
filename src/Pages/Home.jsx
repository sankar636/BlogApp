import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config.js"
import Container from '../components/Container/Container.jsx'
import PostCard from "../components/PostCard.jsx"

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <h1 className="text-xl font-semibold text-gray-600">Login to read posts</h1>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transition-transform transform hover:scale-105 focus-within:scale-105 hover:shadow-xl focus-within:shadow-xl rounded-xl border border-gray-200 p-2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
