import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoSearch.css";

function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  return (
    <section className="TodoSearch">
      <input
        className="TodoSearch__bar"
        placeholder="Search a TODO"
        value={searchValue}
        onChange={onSearchValueChange}
      ></input>
      {/* <button className="TodoSearch__button" ></button> */}
    </section>
  );
}

export { TodoSearch };
