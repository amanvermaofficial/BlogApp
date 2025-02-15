import React, { useState, useEffect } from 'react'
import blogImage from '../assets/blog.jpg'
import appwriteService from '../appwrite/config'
import { Button } from '../components'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import { Link } from 'react-router-dom'


function MyPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true) 
  const user = useSelector((state)=>state.auth.userData);
 
  
  useEffect(() => {
    appwriteService.getPosts([Query.equal("userId",user.$id)]).then((posts) => {
      if (posts) { 
        setPosts(posts.documents)
      }
      setLoading(false) 
    })
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 flex py-8 w-full justify-center">
      {posts.length === 0 ? ( 
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-2">
            <h2 className="text-2xl font-bold">No Posts Found</h2>
            <p className="text-gray-500">Start sharing your thoughts by creating a new post.</p>
            <Link to="/Write">
               <Button>Create Post</Button>
            </Link>
          </div>      
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 flex flex-col px-4">
          {posts.map((post) => (
            <PostCard key={post.$id}   $createdAt={post.$createdAt}  {...post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPosts
