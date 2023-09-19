import React, { useState, useRef } from "react";
import { storage } from "./firebase";
import ImageGallery from "./ImageGallery";
import "bootstrap/dist/css/bootstrap.css";

function ImageUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadFile(file);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const uploadFile = (file) => {
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      const uploadTask = fileRef.put(file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      uploadTask
        .then((snapshot) => {
          console.log("File uploaded:", snapshot);
          setSelectedFile(null);
          setUploadProgress(0);
          // Call the onUploadSuccess callback to notify the parent component
          onUploadSuccess(file.name);
          // Reload the page after a successful upload
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <div
      className={`image-upload-container container`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="mt-5">Image Upload</h2>
      <div
        className={`drop-area my-3 ${isDragging ? "border border-dotted" : ""}`}
      >
        <label>
          Drag and drop a file here or Click to Select One
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </label>
        {uploadProgress > 0 && (
          <p className="mt-3">Uploading: {uploadProgress.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
