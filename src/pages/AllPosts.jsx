import React, {useState, useEffect } from 'react'
import { Container,PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function AllPosts() {
  const [posts,setPosts] = useState([])

  userData = useSelector((state)=>state.auth.userData);

  useEffect(()=>{
    appwriteService.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    })
  },[])
  return (
    <div className="w-full">
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => {
          
          return (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          );
        })}
      </div>
    </Container>
  </div>
  
  
  )
}

export default AllPosts
