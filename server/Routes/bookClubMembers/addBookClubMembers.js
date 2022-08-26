const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addBookClubMembers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const { username, firstName, lastName, email, favouriteBook, favGenres, _id, joinedDate, bookClubName } = req.body;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });

  const profile = await bookClubData.collection("Profiles").findOne({ username: username });

  const userAlreadyMember =
    profile !== null ? getBookClub.members.some((match) => profile.username.includes(match.username)) : null;

  if (userAlreadyMember === false) {
    const newMemberAdded = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub._id },
      {
        $push: { members: { username, firstName, lastName, email, favouriteBook, favGenres, _id, joinedDate } },
      }
    );

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: getBookClub._id }, { $set: { memberCount: getBookClub.members.length + 1 } });

    return (
      res.status(201).json({
        status: 201,
        addedMember: newMemberAdded,
        Message: `Success, new member added`,
      }),
      client.close()
    );
  } else if (userAlreadyMember === true) {
    return (
      res.status(409).json({
        status: 409,
        addedMember: username,
        message: `This member is already in the bookclub`,
      }),
      client.close()
    );
  }
};

module.exports = {
  addBookClubMembers,
};
