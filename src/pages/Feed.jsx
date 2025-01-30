import React, { useState, useEffect } from "react";
import PostForm from "../components/Feed/PostForm";
import CustomCard from "../components/customCard/CustomCard";
import api from "../utils/axios";

const Feed = () => {
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [loading, setLoading] = useState(false);
  // Fetch posts from API

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/post/get-all"); // Replace with your API
      console.log("all posts :", response.data)
      setPosts(response.data.data); // Assuming the API returns an array of posts
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setLoading(false);

    }
  };



  useEffect(() => {
    fetchPosts();
  }, []);

  

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {/* Post creation form */}
      <PostForm refresh = {fetchPosts}/>

      {loading && <span>Loading...</span>}

      {/* Render posts */}
      {posts && posts.map((post, index) => (
        <CustomCard key={index} style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
            {post.name}
          </div>
          <div style={{ marginBottom: "10px" }}>{post.caption}</div>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          )}
        </CustomCard>
      ))}
    </div>
  );
};

export default Feed;
