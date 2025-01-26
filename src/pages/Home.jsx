import React, { useState, useEffect } from 'react'
import blogImage from '../assets/blog.jpg'
import appwriteService from '../appwrite/config'
import { Button } from '../components'
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex gap-4 items-start">
          <div className="bg-pink-200 text-pink-800 text-sm font-bold px-2 py-1 rounded-md">Product</div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Two Titans and Me in the Middle: A Guide to Managing Conflict</h2>
            <p className="text-gray-600 mt-2">
              Would you like to know how I accidentally became a referee between two tech titans? Here’s how I survived that battle.
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
              <span>📅 2d ago</span>
              <span>⭐ 358</span>
              <span>💬 16</span>
            </div>
          </div>
          <img className="h-16 w-16 object-cover rounded-md" src="https://t3.ftcdn.net/jpg/05/91/70/20/360_F_591702071_ZL4Zk1OyxbVGP8tqyAFJhj8EptEhd0Qe.jpg" alt="Image" />
        </div>
      </div>
    </div>

  )
}

export default Home
