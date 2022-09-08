const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const removeRequestToJoin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const { username, email, _id, joinedDate, bookClubName, sub } = req.body;

  const getBookClub = await bookClubData?.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const profile = await bookClubData?.collection("Users").findOne({ _id: _id });

  const pendingToJoin = profile?.bookClubsToJoinPending?.some((match) => getBookClub?._id.includes(match?._id));

  const requestStillPendingForHost = getBookClub?.joinRequestFromUsers?.some((match) =>
    username.includes(match?.username)
  );

  //For user
  const idxOfjoinRequestFromUsers = profile?.bookClubsToJoinPending?.findIndex(
    (object) => object.bookClubName === bookClubName
  );
  //For Book Club
  const idxOfPendingToJoinRequest = getBookClub?.joinRequestFromUsers?.findIndex(
    (object) => object?.username === username
  );

  console.log(`idxOfPendingToJoinRequest:`, idxOfPendingToJoinRequest);
  console.log(`idxOfjoinRequestFromUsers:`, idxOfjoinRequestFromUsers);

  if (pendingToJoin && requestStillPendingForHost) {
    const removeRequestToBookClub = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $pull: { bookClubsToJoinPending: profile?.bookClubsToJoinPending?.[idxOfjoinRequestFromUsers] },
        $inc: { numberOfRequests: -1 },
      }
    );

    const removeRequestInBookClubData = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $pull: { joinRequestFromUsers: getBookClub?.joinRequestFromUsers?.[idxOfPendingToJoinRequest] },
        $inc: { numberOfRequestsToJoin: -1 },
      }
    );

    return (
      res.status(201).json({
        status: 201,
        requestRemovedForUser: removeRequestToBookClub,
        removedRequestInBC: removeRequestInBookClubData,
        Message: `Success, request has been removed`,
      }),
      client.close()
    );
  } else if (pendingToJoin === false && requestStillPendingForHost === false) {
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
  removeRequestToJoin,
};
