const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const getBookClubReadingList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const bookClubData = client.db("Book-Club");

  const totalBookClubs = await bookClubData.collection("Book-Group").find().toArray();

  const bookClub = req.params.groupName.replace(/\s+/g, "").trim();

  const isBookClubFound = totalBookClubs.some((bookGroup) => {
    if (bookGroup.bookClubName.toLowerCase().replace(/\s+/g, "").trim() === bookClub.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  });

  const getList = totalBookClubs.filter((bookGroup) => {
    if (bookGroup.bookClubName.toLowerCase().replace(/\s+/g, "").trim() === bookClub.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  });

  if (isBookClubFound === true && getList[0]?.ReadingList !== undefined) {
    return (
      res
        .status(200)
        .json({ status: 200, BookClubs: getList[0]?.ReadingList, message: "Success, reading list retrieved" }),
      client.close()
    );
  } else if (isBookClubFound === false || getList[0]?.ReadingList === undefined) {
    return (
      res.status(404).json({
        status: 404,
        BookClubs: bookClub,
        Message: "No reading list in book club",
      }),
      client.close()
    );
  }
};

module.exports = {
  getBookClubReadingList,
};
