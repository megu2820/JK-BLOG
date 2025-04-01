import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { Post } from "../../types/post"; 

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);

      window.history.replaceState({}, document.title, "/dashboard");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [navigate]);

  const logout = async () => {
    localStorage.removeItem('token'); 
    navigate("/"); 
    
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="button-container">
          <button className="dashboard-button create" onClick={() => navigate("/posts/create")}>
            Create Post
          </button>
          <button className="dashboard-button logout" onClick={logout}>
            Logout
          </button>
        </div>
        <ul className="post-list">
          {posts.map((post: any) => (
            <li key={post.id} className="post-item" onClick={() => navigate(`/posts/${post.id}`)}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
