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
  const [totalImages, setTotalImages] = useState(0);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchInput.value;
    setQuery(searchQuery);
    setPage(1);
    try {
      const { results, total } = await fetchImages(searchQuery, 1);
      setImages(results);
      setTotalImages(total);
      setVisibleBtn(results.length > 0 && results.length < total);
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
      const { results: newImages } = await fetchImages(query, nextPage);

      setImages((prevImages) => [...prevImages, ...newImages]);

      const allLoaded = images.length + newImages.length >= totalImages;
      setVisibleBtn(!allLoaded);
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
