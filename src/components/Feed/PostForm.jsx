import React, { useState } from "react";
import CustomButton from "../customButton/CustomButton";
import CustomCard from "../customCard/CustomCard";
import axios from "axios";
import api from "../../utils/axios";

const PostForm = ({ refresh }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle form submission
  const handleSubmit = async () => {

    // e.preventDefault();
    if (!caption || !image) {
      alert("Please fill in all fields!");
      return;
    }
    console.log("loading ..............")
    try {
    
      // Prepare post data
      const postData = new FormData();
      postData.append('imageFile' , image);
      postData.append('caption' , caption);
      // API call to save the post
    
      

    //   await axios.post('http://localhost:5000/api/v1/post/create', postData, {
    //     headers : {
    //         'Content-Type' : 'multipart/form-data'
    //     },
        
    //   });

    const res = await api.post('/api/v1/post/create', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      // const result = await res.json();
      setCaption("");
      setImage(null);
      setPreview(null);
      alert("Post created successfully!");
      refresh();
      // Clear form fields
      
    } catch (error) {
      console.error("Error while creating post:", error);
      alert("Failed to create post. Please try again!");
    }

  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <CustomCard>
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Create New Post
      </h2>
      <div>
        <textarea
          id="caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write your caption here..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            resize: "none",
          }}
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />
        {preview && (
          <div style={{ marginBottom: "10px" }}>
            <img
              src={preview}
              alt="Selected Preview"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
        <CustomButton onClick={handleSubmit} type="submit" label="Create Post">
        </CustomButton>
      </div>
    </CustomCard>
  );
};

export default PostForm;
