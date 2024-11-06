import s from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <>
      <header>
        <form className={s.form}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
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
