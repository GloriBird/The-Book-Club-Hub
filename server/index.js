"use strict";

const express = require("express");
const morgan = require("morgan");
const { getWeeklyTrendingBook } = require("./routes/getWeeklyTrendingBook");
const { createProfile } = require("./routes/profile/createProfile");
const { signedInProfile } = require("./routes/profile/signedInProfile");
const { getSingleUser } = require("./routes/findUsers/getSingleUser");
const { getAllUsers } = require("./routes/findUsers/getAllUsers");
const { createBookClub } = require("./routes/bookClubEnv/createBookClub");
const { getAllBookClubs } = require("./routes/bookClubEnv/getAllBookClubs");
const { getSingleBookClub } = require("./routes/bookClubEnv/getSingleBookClub");
const { deleteBookClub } = require("./routes/bookClubEnv/deleteBookClub");
const { addBookClubMembers } = require("./routes/bookClubMembers/addBookClubMembers");

const app = express();
const port = 8000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.get("/weeklyTrendingBooks", getWeeklyTrendingBook);

// PROFILE:
app.post("/create-profile", createProfile);
app.get("/signedInProfile/:id", signedInProfile);

// app.patch("/update-profile", updateProfile);
// app.delete("/delete-profile/:id", deleteProfile);
// app.post("/profile/add-favourite-books", addProfileFavouriteBooks);
// app.get("/profile/current-favourite-books", getProfileFavouriteBooks);
// app.post("/profile/add-reading-list", addProfileReadingList);
// app.get("/profile/current-reading-list", getProfileFavouriteBooks);

// // FIND USER:
app.get("/users", getAllUsers); //Each user will have unique id
app.get("/user/:id", getSingleUser);
//   // BOOKCLUB:
app.post("/create-book-club", createBookClub);
app.get("/browse-book-clubs", getAllBookClubs);
// app.get("/my-book-clubs", getMainUserBookClubs) //Bookclub you're currently in, This can be done in the frontend, later on bookclub members are added on
app.get("/book-club/:name", getSingleBookClub);
app.delete("/delete-book-club/:name", deleteBookClub);

// // BOOKCLUB MEMBERS:
app.patch("/add-member", addBookClubMembers);
// app.get("/bookclub/members", getBookClubMembers);
// app.patch("/update-bookclub-members", updateBookClubMembers); //(remove member)

// // BOOKCLUB READING LIST:
// app.post("/bookClub/reading-list", addBookClubReadingList);
// app.get("/bookClub/reading-list", getBookClubReadingList);
// app.patch("/update-bookClub-reading", updateBookClubReadingList);
// app.delete("/delete-member/:member", deleteMember);

// // CHAT:
// app.post("/bookclub/start-chat", startBookClubChat);
// app.get("/bookclub/chat", getBookClubChat);

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
