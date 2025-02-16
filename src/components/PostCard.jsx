import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function PostCard({ $id, title,desc,featuredImage ,$createdAt  }) {
  const formattedDate = $createdAt ? new Date($createdAt).toLocaleDateString() : "Unknown Date";
  return (
    <Link to={`/post/${$id}`}>
      <div className="sm:w-[40rem] md:w-[45rem] lg:w-[51rem] bg-white shadow-md rounded-lg p-6 flex gap-4 items-start ">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">
            {desc}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
          <span className="px-3 py-1 bg-green-500 text-white font-semibold text-sm rounded-md">
  {formattedDate}
</span>

            {/* <span>⭐ 358</span>
            <span>💬 16</span> */}
          </div>
        </div>
        <img className="h-16 w-16 object-cover rounded-md" src={appwriteService.getFilePreview(featuredImage)} alt={title} />
      </div>
    </Link >
  )
}

export default PostCard
