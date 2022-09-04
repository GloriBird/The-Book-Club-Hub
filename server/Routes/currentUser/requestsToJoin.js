const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const requestsToJoin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const { username, email, _id, joinedDate, bookClubName, sub } = req.body;

  const getBookClub = await bookClubData?.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const profile = await bookClubData?.collection("Users").findOne({ _id: _id });

  const userAlreadyMember = getBookClub?.joinRequestFromUsers.some((match) => _id.includes(match?._id));
  const userAlreadyPending = getBookClub?.joinRequestFromUsers.some((match) => _id.includes(match?._id));

  console.log(`userAlreadyMember:`, userAlreadyMember);
  console.log(`userAlreadyPending:`, userAlreadyPending);

  if (userAlreadyMember === false && userAlreadyPending === false && getBookClub !== null) {
    const requestFromUser = await bookClubData
      ?.collection("Users")
      .updateOne({ _id: _id }, { $push: { bookClubsToJoinPending: getBookClub } });

    const bookClubReceivingRequest = await bookClubData?.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $push: {
          joinRequestFromUsers: {
            username,
            email,
            _id,
            joinedDate,
            sub,
          },
        },
      }
    );

    await bookClubData.collection("Users").updateOne({ _id: _id }, { $inc: { numberOfRequests: 1 } });

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: getBookClub?._id }, { $inc: { numberOfRequestsToJoin: 1 } });

    return (
      res.status(201).json({
        status: 201,
        userRequest: requestFromUser,
        bookClubRecievedResponse: bookClubReceivingRequest,
        Message: `Success, request to join is submitted`,
      }),
      client.close()
    );
  } else if (userAlreadyMember === true || userAlreadyPending === true || getBookClub === null) {
    return (
      res.status(409).json({
        status: 409,
        userRequest: username,
        bookClubRecievedResponse: bookClubName,
        message: `Either this member is already in the bookclub, the book club does not exists, or member is already pending`,
      }),
      client.close()
    );
  }
};

module.exports = {
  requestsToJoin,
};
