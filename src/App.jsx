import "modern-normalize";
import "./App.css";
import { fetchImages } from "./assets/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    try {
      const result = await fetchImages(query, 1);
      setImages(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SearchBar sendQuery={handleSubmit} />
      <ImageGallery cards={images} />
    </>
  );
};

export default App;
