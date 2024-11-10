import "modern-normalize";
import "./App.css";
import { fetchImages } from "./assets/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useState } from "react";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchInput.value.trim();
    if (searchQuery === "") {
      toast.error("Please enter your keyword to search field...", {
        style: {
          background: "red",
          color: "white",
          width: 300,
        },
      });
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    try {
      setErrorMessage(false);
      setLoader(true);
      const { results, total } = await fetchImages(searchQuery, 1);
      setImages(results);
      setTotalImages(total);
      setVisibleBtn(results.length > 0 && results.length < total);
      e.target.reset();
    } catch (error) {
      console.error(error);
      setVisibleBtn(false);
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const loadMoreImg = async () => {
    try {
      setErrorMessage(false);
      setLoader(true);
      const nextPage = page + 1;
      setPage(nextPage);
      const { results: newImages } = await fetchImages(query, nextPage);

      setImages((prevImages) => [...prevImages, ...newImages]);

      const allLoaded = images.length + newImages.length >= totalImages;
      setVisibleBtn(!allLoaded);
    } catch (error) {
      console.error(error);
      setVisibleBtn(false);
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Toaster
        containerStyle={{
          top: 60,
          left: 10,
          bottom: 20,
          right: 20,
        }}
      />
      <SearchBar sendQuery={handleSubmit} />
      {errorMessage ? <ErrorMessage /> : <ImageGallery cards={images} />}
      {loader ? <Loader /> : ""}
      {visibleBtn ? <LoadMoreBtn onLoad={loadMoreImg} /> : ""}
    </>
  );
};

export default App;
