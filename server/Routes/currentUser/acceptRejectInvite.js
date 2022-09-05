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

  //For Book Club
  const idxOfPendingMemberToRemove = getBookClub?.pendingMembers.findIndex((object) => object._id === _id);
  //For User
  const idxOfPendingBookClubToRemove = profile?.bookClubInvites.findIndex(
    (object) => object?.bookClubName === bookClubName
  );

  const userAlreadyMember = getBookClub?.members.some((match) => profile?._id.includes(match?._id));
  const userAlreadyPending = getBookClub?.pendingMembers?.some((match) => profile?._id.includes(match?._id));
  // const userAlreadyRequestedToJoin = profile?.bookClubsToJoinPending?.some((match) =>
  //   getBookClub?.bookClubName.includes(match?.bookClubName)
  // );

  console.log(`accept`, accept);
  console.log(`reject`, reject);
  console.log(`userAlreadyMember`, userAlreadyMember);
  console.log(`userAlreadyPending`, userAlreadyPending);

  if (accept === true && reject === false && userAlreadyMember === false && userAlreadyPending === true) {
    const currentMemberAccepted = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $push: { bookClubs: getBookClub },
        $pull: { bookClubInvites: profile?.bookClubInvites?.[idxOfPendingBookClubToRemove] },
        $inc: { numberOfBookClubs: 1, numberOfClubInvites: -1 },
      }
    );

    await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $push: { members: profile },
        $pull: { pendingMembers: getBookClub?.pendingMembers?.[idxOfPendingMemberToRemove] },
        $inc: { memberCount: 1, pendingMembersCount: -1 },
      }
    );

    return (
      res.status(201).json({
        status: 201,
        acceptOrReject: currentMemberAccepted,
        message: "Success, user accepted the request to join",
      }),
      client.close()
    );
  } else if (accept === false && reject === true && userAlreadyMember === false && userAlreadyPending === true) {
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
        $pull: { pendingMembers: getBookClub?.pendingMembers?.[idxOfPendingMemberToRemove] },
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
  } else if ((accept || !accept || reject || !reject) && userAlreadyMember === true && userAlreadyPending === false) {
    return (
      res.status(409).json({
        status: 409,
        profile: username,
        message: `User is already member`,
      }),
      client.close()
    );
  } else if ((accept || !accept || reject || !reject) && userAlreadyMember === false && userAlreadyPending === false) {
    return (
      res.status(409).json({
        status: 409,
        profile: username,
        message: `User is not a member nor a pending member`,
      }),
      client.close()
    );
  }
};

module.exports = {
  acceptRejectInvite,
};
