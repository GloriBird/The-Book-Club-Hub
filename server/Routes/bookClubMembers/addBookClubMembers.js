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
    profile !== undefined ? getBookClub?.members.some((match) => profile?.sub.includes(match?.sub)) : undefined;

  const userAlreadyPending =
    profile !== undefined ? getBookClub?.pendingMembers?.some((match) => profile?.sub.includes(match?.sub)) : undefined;

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

    const memberToAccept = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $push: {
          bookClubInvites: {
            bookClubName: getBookClub?.bookClubName,
            _id: getBookClub?._id,
            dateCreated: getBookClub?.dateCreated,
            host: getBookClub?.host,
            members: getBookClub?.members,
            memberCount: getBookClub?.memberCount,
            readingList: getBookClub?.readingList,
            bookCount: getBookClub?.bookCount,
          },
        },
      }
    );

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: getBookClub._id }, { $set: { pendingMembersCount: getBookClub.pendingMembers.length + 1 } });

    await bookClubData
      .collection("Users")
      .updateOne({ _id: _id }, { $set: { numberOfClubInvites: profile.bookClubInvites.length + 1 } });

    return (
      res.status(201).json({
        status: 201,
        addedMember: newPendingMember,
        memberToAccept: memberToAccept,
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
