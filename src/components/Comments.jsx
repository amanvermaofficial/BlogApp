import React, { useEffect, useState } from 'react'
import commentService from '../appwrite/comment'

function Comments({ post }) {
    const [comments, setComments] = useState([])

    
    useEffect(() => {
    if (!post?.$id) return;

    commentService.getCommentByPostId(post.$id).then((response) => {
        if (response) {
            setComments(response.documents);
        } else {
            setComments([]); 
        }
    });
}, [post,comments]);
    
    return comments.length !== 0 ? (
        <>
        {
            comments.map((comment) => (
                <div key={comment.$id} className="mb-2 p-3 border rounded shadow-sm bg-gray-100">
                    <p className="text-sm text-gray-800">{comment.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        — {comment.username}
                    </p>
                </div>
            ))
        }
        </>
    ) : (<p className="text-sm text-gray-800">Not Comments yet</p>)
}

export default Comments
