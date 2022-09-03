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

  const { username, email, _id, joinedDate, bookClubName, sub } = req.body;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });

  const profile = await bookClubData.collection("Users").findOne({ _id: _id });

  const userAlreadyMember =
    profile !== null ? getBookClub?.members.some((match) => profile?.sub.includes(match?.sub)) : null;

  const userAlreadyPending =
    profile !== null ? getBookClub?.pendingMembers.some((match) => profile?.sub.includes(match?.sub)) : null;

  if (userAlreadyMember === false && userAlreadyPending === false && getBookClub !== null) {
    const newPendingMember = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub._id },
      {
        $push: {
          pendingMembers: {
            username,
            email: email.replace(/\s+/g, " ").trim(),
            _id,
            joinedDate,
            sub,
          },
        },
      }
    );

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: getBookClub._id }, { $set: { pendingMembersCount: getBookClub.pendingMembers.length + 1 } });

    return (
      res.status(201).json({
        status: 201,
        addedMember: newPendingMember,
        Message: `Success, new member added`,
      }),
      client.close()
    );
  } else if (userAlreadyMember === true || userAlreadyPending === true || getBookClub === null) {
    return (
      res.status(409).json({
        status: 409,
        addedMember: username,
        message: `Either this member is already in the bookclub, the book club does not exists, or member is already pending`,
      }),
      client.close()
    );
  }
};

module.exports = {
  addBookClubMembers,
};
