const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const acceptRejectInvite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const bookClubData = client.db("Book-Club");

  const { _id, username, bookClubName, accept, reject } = req.body;

  const profile = await bookClubData.collection("Users").findOne({ _id: _id });

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  console.log(`getBookClub:`, getBookClub);

  //For Book Club
  const idxOfPendingMemberToRemove = getBookClub?.pendingMembers.findIndex((object) => {
    if (getBookClub?.pendingMembers._id !== _id) {
      return object?._id === _id;
    } else {
      return undefined;
    }
  });

  //For User
  const idxOfPendingBookClubToRemove = profile?.bookClubInvites.findIndex((object) => {
    if (profile?.bookClubInvites?.bookClubName !== bookClubName) {
      return object?.bookClubName === bookClubName;
    } else {
      return undefined;
    }
  });

  console.log(`idxOfPendingBookToRemove:`, idxOfPendingBookClubToRemove);

  if (accept) {
    const currentMemberAccepted = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $push: { bookClubs: getBookClub },
        $pull: { bookClubInvites: profile?.bookClubInvites[idxOfPendingBookClubToRemove] },
        $inc: { numberOfBookClubs: 1, numberOfClubInvites: -1 },
      }
    );

    await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $push: { members: profile },
        $pull: { pendingMembers: getBookClub?.pendingMembers[idxOfPendingMemberToRemove] },
        $inc: { memberCount: 1, pendingMembersCount: -1 },
      }
    );

    res.status(201).json({
      status: 201,
      acceptOrReject: currentMemberAccepted,
      message: "Success, user accepted the request to join",
    }),
      client.close();
  } else if (reject) {
    await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $pull: { bookClubInvites: profile?.bookClubInvites?.[idxOfPendingBookClubToRemove] },
        $inc: { numberOfClubInvites: -1 },
      }
    );

    await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $pull: { pendingMembers: getBookClub?.pendingMembers[idxOfPendingMemberToRemove] },
        $inc: { pendingMembersCount: -1 },
      }
    );

    return (
      res.status(409).json({
        status: 409,
        profile: username,
        message: `Member rejected request to join`,
      }),
      client.close()
    );
  }
};

module.exports = {
  acceptRejectInvite,
};
