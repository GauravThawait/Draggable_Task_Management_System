import React from "react";

const PostItem = ({ post }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        width: "100%",
        maxWidth: "400px"
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        {/* User name with smaller font */}
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>{post.user.name}</span>
        {/* Date and time just below the name */}
        <div style={{ fontSize: "10px", color: "#888" }}>{post.createdAt}</div>
      </div>

      <h3>{post.user.name}</h3>
      <p>{post.caption}</p>
      <img
        src={post.imageUrl}
        alt={post.caption}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
    </div>
  );
};

export default PostItem;
