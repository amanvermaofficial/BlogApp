import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 w-full flex justify-center">
      <Container className="max-w-4xl w-full px-4">
        <div className="w-full flex flex-col items-center mb-4 border rounded-xl p-2 shadow-md">
          {/* Responsive Image */}
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            className="w-full max-h-[400px] object-contain rounded-lg"
            alt={post.title}
          />

          {/* Buttons for Author */}
          {isAuthor && (
            <div className="w-full flex justify-end mt-2 space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="w-full mb-4 text-center">
          <h1 className="text-2xl font-bold break-words">{post.title}</h1>
        </div>

        {/* Content */}
        <div className="browser-css text-justify leading-relaxed mb-16">{parse(post.content)}</div>
        <div className="">
          <h4 className="font-bold text-2xl mb-3">Comments</h4>
          <CommentForm post={post}/>
          <Comments post={post}/>
        </div>
        
      </Container>
    </div>
  ) : null;
}

export default Post;
