"use strict";

const express = require("express");
const morgan = require("morgan");
const { getWeeklyTrendingBook } = require("./routes/books");
const { createProfile } = require("./routes/profile/createProfile");
const { signedInProfile } = require("./routes/profile/signedInProfile");
const { getSingleUser } = require("./routes/findUsers/getSingleUser");
const { getAllUsers } = require("./routes/findUsers/getAllUsers");
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
// app.post("/create-bookclub", createBookClub);
// app.get("/bookclubs", getBookClubs); //Bookclub you're currently in
// app.get("/bookclub/:name", getSingleBookClub);
// app.delete("/delete-bookclub/:name", deleteBookClub);

// // BOOKCLUB MEMBERS:
// app.post("/bookclub/members", getBookClubMembers);
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
