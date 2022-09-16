import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState("");
  const { weeklyTrendingBooks, allBookClub } = useContext(GlobalContext);
  const userData = useContext(CurrentUserContext);

  const { title } = useParams();

  const {
    state: { hostingBookClubs },
  } = userData;

  const book =
    weeklyTrendingBooks !== null && weeklyTrendingBooks?.filter((x) => x?.title?.replace(/\s+/g, "").trim() === title);
  console.log(`weeklyTrendingBooks:`, weeklyTrendingBooks);
  console.log(`book:`, book);
  return (
    <div>
      <p>BookDetails</p>
    </div>
  );
};

export default BookDetails;
