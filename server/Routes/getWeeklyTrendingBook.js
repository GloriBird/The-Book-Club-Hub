const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getWeeklyTrendingBook = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const bookData = client.db("Book-Club");

  const weeklyBooks = await bookData.collection("Weekly-Trending-Books").find().toArray();

  if (weeklyBooks.length > 0) {
    res.status(200).json({ status: 200, data: weeklyBooks, message: "Success" });
  } else if (weeklyBooks.length < 1) {
    res.status(404).json({
      status: 404,
      data: weeklyBooks,
      message: "There are no books in the weekly trend data",
    });
  }
};

module.exports = {
  getWeeklyTrendingBook,
};
