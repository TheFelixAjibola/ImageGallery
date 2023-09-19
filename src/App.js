import React, { useEffect, useState } from "react";
import { auth, storage } from "./firebase";
import Login from "./Login";
import Logout from "./Logout";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [user, setUser] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [images, setImages] = useState([]); // State to store images

  const handleUploadSuccess = (url) => {
    setUploadedImageUrl(url);
    // Call the onImagesUpdated function to update the images state
    onImagesUpdated();
  };

  // Define the handleDragEnd function
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }
    // Implement any additional logic for reordering images here
  };

  // Define the onImagesUpdated function
  const onImagesUpdated = async () => {
    try {
      // Fetch the latest images and update the images state
      const storageRef = storage.ref();
      const result = await storageRef.listAll();
      const imageUrls = await Promise.all(
        result.items.map(async (item) => {
          const url = await item.getDownloadURL();
          return { url, name: extractFileName(url) };
        })
      );
      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Helper function to extract file name without extension
  const extractFileName = (url) => {
    const parts = url.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    const fileName = fileNameWithExtension.split(".")[0];
    return fileName;
  };

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="bg-primary text-white p-3">
          <h1 className="text-center">Image Gallery</h1>
        </header>
        <div className="container mt-4">
          {user ? (
            <div>
              <Logout />
              <ImageUpload onUploadSuccess={handleUploadSuccess} />

              <DragDropContext onDragEnd={handleDragEnd}>
                {/* Pass the images state and setImages function as props */}
                <ImageGallery
                  uploadedImageUrl={uploadedImageUrl}
                  images={images}
                  setImages={setImages}
                />
              </DragDropContext>
            </div>
          ) : (
            <Login />
          )}
        </div>
        <ToastContainer />
      </div>
    </DndProvider>
  );
}

export default App;
