import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import "bootstrap/dist/css/bootstrap.css";

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);

  // Helper function to extract file name without extension
  const extractFileName = (url) => {
    const parts = url.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    const fileName = fileNameWithExtension.split(".")[0];
    return fileName;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = storage.ref();
        const result = await storageRef.listAll();
        const imageUrls = await Promise.all(
          result.items.map(async (item) => {
            const url = await item.getDownloadURL();
            return { url, name: extractFileName(url) }; // Extract file name without extension
          })
        );
        setImages(imageUrls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterImages(query);
  };

  const filterImages = (query) => {
    const filtered = images.filter(
      (image) =>
        image.name.toLowerCase().includes(query) ||
        image.url.toLowerCase().includes(query)
    );
    setFilteredImages(filtered);
  };

  const displayedImages = searchQuery ? filteredImages : images;

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("image", JSON.stringify(image));
    setDraggedImage(image);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setTargetIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggedImage !== null && targetIndex !== null) {
      const updatedImages = [...images];
      const draggedImageIndex = updatedImages.findIndex(
        (image) => image.url === draggedImage.url
      );

      if (draggedImageIndex !== -1) {
        [updatedImages[draggedImageIndex], updatedImages[index]] = [
          updatedImages[index],
          updatedImages[draggedImageIndex],
        ];

        setImages(updatedImages);
        setDraggedImage(null);
        setTargetIndex(null);
      }
    }
  };

  return (
    <div className="container image-gallery-container">
      <h2 className="mt-3">Image Gallery</h2>
      <input
        type="text"
        placeholder="Search by name or tag..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="form-control my-3"
      />
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {displayedImages.map((image, index) => (
            <div
              key={index}
              className="col-md-3 mb-3"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="card">
                <img
                  src={image.url}
                  alt={image.name}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <p className="card-text">{image.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
