const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getBookClubMembers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const totalBookClubs = await bookClubData.collection("Book-Group").find().toArray();

  const membersInClub = req.params.members;

  const getBookClub = totalBookClubs.filter((bookMembers) => {
    if (bookMembers.bookClubName === membersInClub) {
      return true;
    } else {
      return false;
    }
  });

  if (getBookClub.length > 0) {
    return (
      res.status(200).json({
        status: 200,
        bookClubMembers: getBookClub[0].members,
        message: "Success, book clubs retrieved",
      }),
      client.close()
    );
  } else {
    return (
      res.status(404).json({
        status: 404,
        bookClubMembers: membersInClub,
        Message: "This book club does not exists",
      }),
      client.close()
    );
  }
};

module.exports = {
  getBookClubMembers,
};
