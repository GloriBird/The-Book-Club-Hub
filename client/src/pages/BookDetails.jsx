import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState("");
  const [currentBook, setCurrentBook] = useState("");
  const [issBookLoaded, setIsBookLoaded] = useState("");

  // const { weeklyTrendingBooks, allBookClub, pickedBook } = useContext(GlobalContext);
  // const userData = useContext(CurrentUserContext);

  const { bookId, author, details } = useParams();

  console.log(`bookId:`, bookId);
  console.log(`author:`, author);
  console.log(`works:`, details);

  // useEffect(() => {
  //   const getCurrentBook = async () => {
  //     setIsBookLoaded(false);
  //     const book = await fetch(`https://openlibrary.org/books/${bookId}.json`);
  //     const selectedBook = await book.json();
  //     const bookObj = await selectedBook?.works?.[0];
  //     const bookString = await Object.values(bookObj)?.[0];
  //     // setCurrentBook(`https://openlibrary.org${bookString}.json`);
  //     console.log(`bookString:`, bookString);
  //     const getBookInfo = await fetch(`https://openlibrary.org${bookString}.json`);
  //     const processBookInfo = await getBookInfo.json();

  //     console.log(`processBookInfo:`, processBookInfo);
  //     // const currentWeeksBooks = await listOfUser?.works?.map((x) => {
  //     //   const weeklyBooks = {
  //     //     title: x?.title,
  //     //     first_published: x?.first_publish_year,
  //     //     cover: x?.cover_edition_key,
  //     //     author: x?.author_name,
  //     //     author_key: x?.author_key,
  //     //   };
  //     //   return weeklyBooks;
  //     // });
  //     // setWeeklyTrendingBooks(currentWeeksBooks);
  //     // setHasLoaded(true);
  //   };
  //   getCurrentBook();
  // }, []);

  // const book =
  //   weeklyTrendingBooks !== null && weeklyTrendingBooks?.filter((x) => x?.title?.replace(/\s+/g, "").trim() === title);
  // console.log(`weeklyTrendingBooks:`, weeklyTrendingBooks);
  // console.log(`book:`, book);
  return (
    <div>
      <p>BookDetails</p>
    </div>
  );
};

export default BookDetails;
