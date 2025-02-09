import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)
    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile( post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file = await appwriteService.uploadFile(data.image[0]);
            if(file){
                const fileId=file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData?.$id
                })
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value==='string')
            return value
                .trim()
                .toLocaleLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')

        return ''        
    },[])
  return (
    <div>
      
    </div>
  )
}

export default PostForm
