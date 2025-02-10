import React, { useState, useEffect } from 'react'
import blogImage from '../assets/blog.jpg'
import appwriteService from '../appwrite/config'
import { Button } from '../components'
import PostCard from '../components/PostCard'
function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className='flex items-center justify-center max-w-screen-2xl my-0 mx-auto gap-x-9'>

        <div className='' style={{ width: '40%' }}>
          <img src={blogImage} className='rounded-lg shadow-2xl' alt="" />
        </div>
        <div className='flex items-center flex-col justify-center gap-5'>
          <div className='flex items-center flex-col gap-2'>
            <h1 className='font-bold text-center landing-page-headline text-9xl'>Share Ideas & Thoughts</h1>
            <p className='w-50 text-center text-gray-500 bg-yellow-100' style={{ width: "600px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam commodi consequatur eveniet veritatis maxime quis similique?</p>
          </div>
          <div>
            <Button>Get Started</Button>
          </div>
        </div>

      </div>
    )
  }


  return (


    <div className="bg-gray-100 min-h-screen py-8">
      {posts.map((post)=>(
      <div key={post.$id} className="max-w-4xl mx-auto space-y-6">
         <PostCard {...post} />
      </div>
       ))}
    </div>

  )
}

export default Home
