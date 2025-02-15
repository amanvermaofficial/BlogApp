import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE, Container } from '../index'


function PostForm({ post }) {
   const [error,setError] = useState("")
  const { register, handleSubmit, watch, setValue, control, getValues,formState: { errors }  } = useForm({
    defaultValues: {
      title: post?.title || '',
      desc: post?.desc || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    }
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const [loading, setLoading] = useState(false)
  const submit = async (data) => {
    setLoading(true);
    setError("")
    try {
      if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

        if (file) {
          appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
      else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          console.log(userData?.$id)
          const fileId = file.$id
          data.featuredImage = fileId
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData?.$id
          })
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
          }
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false); 
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')

    return ''
  }, [])

  useEffect(() => {
    const subscription = watch(
      (value, { name }) => {
        if (name === 'title') {
          setValue('slug', slugTransform(value.title, { shouldValidate: true }))
        }
      }
    )

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (

    <form onSubmit={handleSubmit(submit)} className="md:flex md:flex-wrap py-8">
      <div className=" md:w-2/3 px-2">

        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
         {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            console.log(e.currentTarget.value);
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}

        <Input
          label="Desc :"
          placeholder="Description"
          className="mb-4"
          {...register('desc', { required: true,
            maxLength: {
              value: 100,
              message: "Description must be 100 characters or less"
            }
           })}
        />
        {errors.desc && <p className="text-red-500 text-sm my-1">{errors.desc.message}</p>}

        <RTE label="Content : " name="content" control={control} defaultValue={getValues('content')} />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>
      <div className="w-1/2 md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png,image/jpg,image/jpeg,image/gif"
          {...register("image", { required: !post })}
        />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        {post && (
          <div className="w-full mb-4">
            <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
         {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
