import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css"; 

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/posts`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Post created!");  
      setTimeout(() => navigate("/dashboard"), 1500);  
    } catch (error) {
      setMessage("Failed to create post");  
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h1 className="create-post-title">Create Post</h1>
        <form className="create-post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="textarea-field"
          />
          <button type="submit" className="create-button">Create</button>
          <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
        </form>
        {message && <p className="post-message">{message}</p>} 
      </div>
    </div>
  );
};

export default CreatePost;

