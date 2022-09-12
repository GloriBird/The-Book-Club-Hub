const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addBooks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");
  const { username, dataAdded, bookClubName, bookImg } = req.body;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const profile = await bookClubData.collection("Users").findOne({ username: username });

  const userAlreadyMember = getBookClub?.readingList.some((match) => bookClubName.includes(match?.bookClubName));
};

module.exports = {
  addBooks,
};
