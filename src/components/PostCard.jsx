import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className="bg-white shadow-md rounded-lg p-6 flex gap-4 items-start">
          <div className="bg-pink-200 text-pink-800 text-sm font-bold px-2 py-1 rounded-md">Product</div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">
              Would you like to know how I accidentally became a referee between two tech titans? Here’s how I survived that battle.
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
              <span>📅 2d ago</span>
              <span>⭐ 358</span>
              <span>💬 16</span>
            </div>
          </div>
          <img className="h-16 w-16 object-cover rounded-md" src={appwriteService.getFilePreview(featuredImage)} alt={title} />
        </div>
    </Link>
  )
}

export default PostCard
