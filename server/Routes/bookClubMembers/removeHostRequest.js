const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const removeHostRequest = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  //------------------------------------------------------------------------------------------

  const bookClubData = client.db("Book-Club");

  const { username, email, _id, joinedDate, bookClubName, sub } = req.body;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const profile = await bookClubData.collection("Users").findOne({ _id: _id });

  const userAlreadyPending = getBookClub?.pendingMembers?.some((match) => profile?._id.includes(match?._id));

  const requestStillPendingForUser = profile?.bookClubInvites?.some((match) =>
    bookClubName.includes(match?.bookClubName)
  );

  console.log(`userAlreadyPending:`, userAlreadyPending);
  console.log(`requestStillPendingForUser:`, requestStillPendingForUser);

  //For Book Club
  const idxOfPendingMembers = getBookClub?.pendingMembers?.findIndex((object) => object._id === _id);
  //For user
  const idxOfBookClubInvites = profile?.bookClubInvites?.findIndex((object) => object?.bookClubName === bookClubName);

  console.log(`idxOfPendingMembers:`, idxOfPendingMembers);
  console.log(`idxOfBookClubInvites:`, idxOfBookClubInvites);

  if (userAlreadyPending && requestStillPendingForUser) {
    const removeRequestToMember = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $pull: { pendingMembers: getBookClub?.pendingMembers?.[idxOfPendingMembers] },
        $inc: { pendingMembersCount: -1 },
      }
    );

    const removeRequestInUserData = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $pull: { bookClubInvites: profile?.bookClubInvites?.[idxOfBookClubInvites] },
        $inc: { numberOfClubInvites: -1 },
      }
    );

    return (
      res.status(201).json({
        status: 201,
        requestRemoved: removeRequestToMember,
        removedBookClubInvite: removeRequestInUserData,
        Message: `Success, request has been removed`,
      }),
      client.close()
    );
  } else if (userAlreadyPending === false && requestStillPendingForUser === false) {
    return (
      res.status(409).json({
        status: 409,
        message: `Either this request is already removed or member accepted or rejected the request`,
      }),
      client.close()
    );
  }
};

module.exports = {
  removeHostRequest,
};
