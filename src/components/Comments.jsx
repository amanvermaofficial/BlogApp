import React, { useEffect, useState } from 'react'
import commentService from '../appwrite/comment'
import { useSelector } from 'react-redux'


function Comments({ post,setEditingComment }) {
    const [comments, setComments] = useState([])
    const [openDropdown,setOpenDropdown] = useState(null)
    const userData = useSelector((state)=>state.auth.userData)

    const toggleDropdown = (id)=>{
        setOpenDropdown((prevId)=>prevId===id ? null : id)
    }

    const handleDelete = (id)=>{
        commentService.deleteComment(id);
    }

    const handleEdit = (commentData)=>{
        setEditingComment(commentData)
        setOpenDropdown(null)
    }

    useEffect(() => {
        if (!post?.$id) return;

        commentService.getCommentByPostId(post.$id).then((response) => {
            if (response) {
                setComments(response.documents);
            } else {
                setComments([]);
            }
        });
    }, [post, comments]);

    return comments.length !== 0 ? (
        <>
            {
                comments.map((comment) => (
                    <div key={comment.$id} className="mb-2 p-3 border rounded shadow-sm bg-gray-100 relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-800">{comment.comment}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    — {comment.username}
                                </p>
                            </div>

                            {/* Dropdown Button */}
                            <div className="relative">
                                 {
                                userData.$id === comment.userId &&
                                (
                                     <button
                                    onClick={() => toggleDropdown(comment.$id)}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    &#x22EE; {/* Unicode for vertical three dots */}
                                </button>
                                )
                            }
                               

                                {openDropdown === comment.$id && (
                                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                                        <button
                                            onClick={() => handleEdit({id:comment.$id,text:comment.comment})}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment.$id)}
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                ))
            }
        </>
    ) : (<p className="text-sm text-gray-800">Not Comments yet</p>)
}

export default Comments
