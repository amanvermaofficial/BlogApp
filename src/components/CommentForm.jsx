import React, { useEffect, useState } from 'react'
import { Input } from './index'
import { useForm } from 'react-hook-form'
import commentService from '../appwrite/comment';
import { useSelector } from 'react-redux';

function CommentForm({ post, editingComment, setEditingComment }) {
    const { register, handleSubmit, reset,setValue } = useForm();
    const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (editingComment) {
        setValue('comment', editingComment.text); // ✅ this sets just the field, doesn't reset entire form
    } else {
        reset(); // clear all fields if no comment being edited
    }
}, [editingComment, setValue, reset]);
  
    const onSubmit = async (data) => {
        if (editingComment) {
            const comment = await commentService.updateComment(editingComment.id, { comment: data.comment })
            if (comment) {
                alert("Comment Edit successfully !")
                reset()
                setEditingComment(null)
            }
        } else {
            const file = await commentService.createComment({
                postId: post.$id,
                userId: userData.$id,
                username: userData.name,
                comment: data.comment
            })
            if (file) {
                alert("Comment posted successfully!");
                reset();
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="focus-within:outline-2 focus-within:outline-indigo-600 flex gap-2 mb-2">
                <textarea className="outline-none w-5/6 border-b border-gray-300" placeholder="Leave a comment..."
                    {...register('comment', { required: true })}
                />
                <div className=''>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">{editingComment ? "Edit Comment" : "Comment"}</button>
                </div>
            </div>
        </form>
    )
}

export default CommentForm
