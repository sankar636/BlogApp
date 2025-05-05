import React from 'react'
import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredimage }) => {
  return (
    <Link to={`/post/${$id}`} className="block transform transition duration-300 hover:scale-105 focus:scale-105">
      <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300'>
        <div className='w-full mb-4 overflow-hidden rounded-xl'>
          <img
            src={appwriteService.getFileView(featuredimage)}
            alt={title}
            className='w-full h-48 object-cover transition-transform duration-300 hover:scale-110'
          />
        </div>
        <h2 className='text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard


// // console.log("Id: ",$id);  
// console.log("title: ",title);  
// console.log("Image",featuredimage);
// console.log("Featured Image",appwriteService.getFileView(featuredimage)); 