import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const SearchBooks = () => {
  const { searchBook } = useContext(GlobalContext);
  return <div>hello</div>;
};

export default SearchBooks;
