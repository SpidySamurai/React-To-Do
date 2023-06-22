import React, { useEffect } from "react";
import "./TodoSearch.css";

function TodoSearch({ searchValue, setSearchValue, loading, params , setParams }) {

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);

    let params = {
      search: event.target.value
    }
    setParams(params);
  };

  useEffect(() => {
    const search = params.get("search") ?? "";
    setSearchValue(search);
  },[params])

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
