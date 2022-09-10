"use strict";

const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8000;
const cors = require("cors");

const { getWeeklyTrendingBook } = require("./routes/getWeeklyTrendingBook");
const { createProfile } = require("./routes/currentUser/createProfile");
const { signedInProfile } = require("./routes/currentUser/signedInProfile");
const { updateProfile } = require("./routes/currentUser/updateProfile");
const { acceptRejectInvite } = require("./routes/currentUser/acceptRejectInvite");
const { removeRequestToJoin } = require("./routes/currentUser/removeRequestToJoin");
const { requestsToJoin } = require("./routes/currentUser/requestsToJoin");
const { getSingleUser } = require("./routes/findUsers/getSingleUser");
const { getAllUsers } = require("./routes/findUsers/getAllUsers");
const { createBookClub } = require("./routes/bookClubEnv/createBookClub");
const { getAllBookClubs } = require("./routes/bookClubEnv/getAllBookClubs");
const { getSingleBookClub } = require("./routes/bookClubEnv/getSingleBookClub");
const { deleteBookClub } = require("./routes/bookClubEnv/deleteBookClub");
const { addBookClubMembers } = require("./routes/bookClubMembers/addBookClubMembers");
const { removeHostRequest } = require("./routes/bookClubMembers/removeHostRequest");
const { getBookClubMembers } = require("./routes/bookClubMembers/getBookClubMembers");
const { acceptRejectUserRequest } = require("./routes/bookClubMembers/acceptRejectUserRequest");
const { updateHostOrName } = require("./routes/bookClubMembers/updateHostOrName");
const { removeMember } = require("./routes/bookClubMembers/removeMember");
const { addBookClubReadingList } = require("./routes/bookClubReadingList/addBookClubReadingList");
const { getBookClubReadingList } = require("./routes/bookClubReadingList/getBookClubReadingList");
const { removeBookInReadingList } = require("./routes/bookClubReadingList/removeBookInReadingList");
const { deleteProfile } = require("./routes/currentUser/deleteProfile");
const { addBooks } = require("./routes/bookListEnv/addBooks");
const { isObject } = require("util");

//-------------------------------------------------------------------------------------------------
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
const http = require("http").createServer(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketIO.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    console.log(`data received`, data);
  });
});
//-------------------------------------------------------------------------------------------------

app.get("/weeklyTrendingBooks", getWeeklyTrendingBook);

// PROFILE:
app.post("/create-profile", createProfile);
app.get("/signedInProfile/:sub", signedInProfile);
app.delete("/delete-profile/:id", deleteProfile);
app.patch("/update-profile", updateProfile);
app.patch("/accept-reject-invite", acceptRejectInvite);
app.patch("/request-to-join-book-club", requestsToJoin);
app.patch("/remove-request-to-join", removeRequestToJoin);

// // FIND USER:
app.get("/users", getAllUsers);
app.get("/user/:sub", getSingleUser);
//   // BOOKCLUB:
app.post("/create-book-club", createBookClub);
app.get("/browse-book-clubs", getAllBookClubs);

app.get("/book-club/:name", getSingleBookClub);
app.delete("/delete-book-club/:name", deleteBookClub);
app.post("/add-books", addBooks);

// // BOOKCLUB MEMBERS:
app.patch("/add-member", addBookClubMembers);
app.patch("/remove-request", removeHostRequest);
app.get("/bookclub/:members", getBookClubMembers);
app.patch("/update-bookclub", updateHostOrName); //UpdateNameandHost
app.patch("/remove-member", removeMember);
app.patch("/accept-reject-user-request", acceptRejectUserRequest);

// // BOOKCLUB READING LIST:
app.post("/bookClub/reading-list", addBookClubReadingList);
app.get("/bookClub/:groupName/reading-list", getBookClubReadingList);
app.patch("/remove-book-reading-list", removeBookInReadingList);

// // CHAT:
// app.post("/bookclub/start-chat", startBookClubChat);
// app.get("/bookclub/chat", getBookClubChat);

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// app.listen(port, () => {
//   console.log(`Listening to port ${port}`);
// });
http.listen(port, () => {
  console.log(`Listening to port ${port}`);
  // socketIO.on("connection", (socket) => {
  //   console.log("user connected " + socket.id);
  // });
});
