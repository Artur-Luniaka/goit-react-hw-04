import "modern-normalize";
import "./App.css";
import { fetchImages } from "./assets/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    setQuery(query);
    setPage(1);
    try {
      const result = await fetchImages(query, 1);
      setImages(result);
      setVisibleBtn(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      setVisibleBtn(false);
    }
  };

  const loadMoreImg = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);
      const newImages = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...newImages]);
      if (newImages.length <= 0) {
        setVisibleBtn(false);
      } else {
        setVisibleBtn(true);
      }
    } catch (error) {
      console.error(error);
      setVisibleBtn(false);
    }
  };

  return (
    <>
      <SearchBar sendQuery={handleSubmit} />
      <ImageGallery cards={images} />
      {visibleBtn ? <LoadMoreBtn onLoad={loadMoreImg} /> : ""}
    </>
  );
};

export default App;
