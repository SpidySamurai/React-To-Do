import React from "react";
import "./TodoSearch.css";

function TodoSearch({ searchValue, setSearchValue, loading }) {
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <section className="TodoSearch">
      <input
        className="TodoSearch__bar"
        placeholder="Search a TODO"
        value={searchValue}
        onChange={onSearchValueChange}
        disabled={loading}
      ></input>
      {/* <button className="TodoSearch__button" ></button> */}
    </section>
  );
}

export { TodoSearch };
