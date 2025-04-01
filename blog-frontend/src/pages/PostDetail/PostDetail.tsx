import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css"; 

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="post-detail-container">
    <div className="post-detail-card">
      {post ? (
        <>
          <h1 className="post-detail-title">{post.title}</h1>
          <p className="post-detail-body">{post.body}</p>
        </>
      ) : (
        <p>Loading post...</p>
      )}
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  </div>
  );
};

export default PostDetail;
