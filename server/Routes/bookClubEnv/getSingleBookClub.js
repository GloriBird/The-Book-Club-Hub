const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSingleBookClub = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");
  const searchedBookClub = req.params.name;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: searchedBookClub });

  getBookClub
    ? (res.status(200).json({ status: 200, account: getBookClub, message: "Success, book club found" }), client.close())
    : (res.status(404).json({
        status: 404,
        account: getBookClub,
        Message: "Book club not found",
      }),
      client.close());
};

module.exports = {
  getSingleBookClub,
};
