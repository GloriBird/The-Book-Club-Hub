import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const [currentBook, setDescription] = useState("");
  const [issBookLoaded, setIsBookLoaded] = useState("");

  // const { weeklyTrendingBooks, allBookClub, pickedBook } = useContext(GlobalContext);
  // const userData = useContext(CurrentUserContext);

  const { bookId, author, details } = useParams();

  // console.log(`bookId:`, bookId);
  // console.log(`author:`, author);
  // console.log(`works:`, details);

  useEffect(() => {
    const getCurrentBook = async () => {
      setIsBookLoaded(false);
      const book = await fetch(`https://openlibrary.org/works/${details}.json`);
      const selectedBook = await book.json();
      console.log(`selectedBook:`, selectedBook?.first_publish_date);
      const getDetails = {
        title: selectedBook?.title,
        first_published: selectedBook?.first_publish_date,
        cover: bookId,
        author: author,
        description: selectedBook?.description,
      };
      setBookDetails([getDetails]);
    };
    getCurrentBook();
  }, [bookId, author, details]);

  console.log(`bookDetails :`, bookDetails);

  // const book =
  //   weeklyTrendingBooks !== null && weeklyTrendingBooks?.filter((x) => x?.title?.replace(/\s+/g, "").trim() === title);
  // console.log(`weeklyTrendingBooks:`, weeklyTrendingBooks);
  // console.log(`book:`, book);
  return (
    <div>
      {bookDetails !== null && (
        <>
          {bookDetails?.map((x, idx) => (
            <div key={idx}>
              <img src={`https://covers.openlibrary.org/b/olid/${x?.cover}-L.jpg`} alt={"book Covers"} />
              <h3>{x?.title}</h3>
              <h3>{x?.author}</h3>
              <p>{x?.description?.value}</p>
              <p>{x?.first_published}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BookDetails;
