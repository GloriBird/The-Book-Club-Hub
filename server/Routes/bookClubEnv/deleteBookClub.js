const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const moment = require("moment");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteBookClub = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const bookClubToRemove = req.params.name;

  const getBookGroup = await bookClubData.collection("Book-Group").find().toArray();

  const findBookClub = getBookGroup.some((group) => {
    if (group.bookClubName.toLowerCase().trim() === bookClubToRemove.toLowerCase().trim()) {
      return true;
    } else if (group.bookClubName.toLowerCase().trim() !== bookClubToRemove.toLowerCase().trim()) {
      return false;
    }
  });

  if (findBookClub === true) {
    const getGroup = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubToRemove });

    bookClubData.collection("Deleted-Book-Clubs").insertOne(getGroup);

    const { _id } = getGroup;

    const bookClubDeleted = await bookClubData.collection("Book-Group").deleteOne({ _id: _id });

    return res.status(204).json({ status: 204, data: bookClubDeleted, message: "Success" }), client.close();
  } else {
    return (
      res.status(404).json({ status: 404, data: bookClubToRemove, Message: "This book club cannot be found" }),
      client.close()
    );
  }
};

module.exports = {
  deleteBookClub,
};
