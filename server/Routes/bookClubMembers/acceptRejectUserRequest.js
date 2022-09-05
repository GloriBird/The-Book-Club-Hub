const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const acceptRejectUserRequest = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const bookClubData = client.db("Book-Club");

  const { _id, username, bookClubName, accept, reject } = req.body;

  const profile = await bookClubData.collection("Users").findOne({ _id: _id });
  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });

  //For Book Club
  const idxOfJoinRequestFromUsers = getBookClub?.joinRequestFromUsers.findIndex((object) => object._id === _id);
  //For User
  const idxOfBookClubToRemove = profile?.bookClubsToJoinPending.findIndex(
    (object) => object?.bookClubName === bookClubName
  );

  const userAlreadyMember = getBookClub?.members.some((match) => profile?._id.includes(match?._id));
  const userAlreadyPending = getBookClub?.pendingMembers?.some((match) => profile?._id.includes(match?._id));
  const userAlreadyRequestToJoin = getBookClub?.joinRequestFromUsers?.some((match) =>
    profile?._id.includes(match?._id)
  );

  console.log(`idxOfJoinRequestFromUsers:`, idxOfJoinRequestFromUsers);
  console.log(`idxOfBookClubToRemove:`, idxOfBookClubToRemove);
  console.log(`userAlreadyMember:`, userAlreadyMember);
  console.log(`userAlreadyPending:`, userAlreadyPending);
  console.log(`userAlreadyRequestToJoin:`, userAlreadyRequestToJoin);

  if (
    accept === true &&
    reject === false &&
    userAlreadyMember === false &&
    userAlreadyPending === false &&
    userAlreadyRequestToJoin === true
  ) {
    const currentMemberAccepted = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $push: { members: profile },
        $pull: { joinRequestFromUsers: getBookClub?.joinRequestFromUsers?.[idxOfJoinRequestFromUsers] },
        $inc: { memberCount: 1, numberOfRequestsToJoin: -1 },
      }
    );

    await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $push: { bookClubs: getBookClub },
        $pull: { bookClubsToJoinPending: profile?.bookClubsToJoinPending?.[idxOfBookClubToRemove] },
        $inc: { numberOfBookClubs: 1, numberOfRequests: -1 },
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
  } else if (
    accept === false &&
    reject === true &&
    userAlreadyMember === false &&
    userAlreadyPending === false &&
    userAlreadyRequestToJoin === true
  ) {
    await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $pull: { joinRequestFromUsers: getBookClub?.joinRequestFromUsers?.[idxOfJoinRequestFromUsers] },
        $inc: { numberOfRequestsToJoin: -1 },
      }
    );

    await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $pull: { bookClubsToJoinPending: profile?.bookClubsToJoinPending?.[idxOfBookClubToRemove] },
        $inc: { numberOfRequests: -1 },
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
  } else if (
    (accept || !accept || reject || !reject) &&
    (userAlreadyMember === true || userAlreadyPending === true || userAlreadyRequestToJoin === false)
  ) {
    return (
      res.status(409).json({
        status: 409,
        profile: username,
        message: `Either user is already a member, is pending or is did not request another join`,
      }),
      client.close()
    );
  } else if (
    (accept || !accept || reject || !reject) &&
    userAlreadyMember === false &&
    userAlreadyPending === false &&
    userAlreadyRequestToJoin === false
  ) {
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
  acceptRejectUserRequest,
};
