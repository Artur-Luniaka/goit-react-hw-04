import s from "./SearchBar.module.css";

const SearchBar = ({ sendQuery }) => {
  return (
    <>
      <header>
        <form className={s.form} onSubmit={sendQuery}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
          />
          <button className={s.button} type="submit">
            Search
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
