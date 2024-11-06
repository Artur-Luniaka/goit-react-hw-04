import "modern-normalize";
import "./App.css";
import { fetchImages } from "./assets/api";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  return (
    <>
      <SearchBar />
    </>
  );
};

export default App;
