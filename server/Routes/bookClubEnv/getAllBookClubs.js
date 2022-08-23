const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllBookClubs = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const totalBookClubs = await bookClubData.collection("book-groups").find().toArray();

  if (totalBookClubs.length > 0) {
    return (
      res.status(200).json({ status: 200, BookClubs: totalBookClubs, message: "Success, book clubs retrieved" }),
      client.close()
    );
  } else {
    return (
      res.status(404).json({
        status: 404,
        BookClubs: totalBookClubs,
        Message: "No books clubs in data",
      }),
      client.close()
    );
  }
};

module.exports = {
  getAllBookClubs,
};
