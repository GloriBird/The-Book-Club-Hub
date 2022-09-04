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

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });

  const userAlreadyMember = getBookClub?.members.some((match) => _id.includes(match?._id));
  const userAlreadyPending = getBookClub?.pendingMembers.some((match) => _id.includes(match?._id));

  const profile = await bookClubData.collection("Users").findOne({ _id: _id });
  console.log(`profile:`, profile);

  if (userAlreadyMember === false && userAlreadyPending === false && getBookClub !== null) {
    const userRequest = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $push: {
          bookClubsToJoinPending: {
            getBookClub,
          },
        },
      }
    );

    const bookClubToAccept = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub._id },
      {
        $push: {
          joinRequestFromUsers: {
            _id,
            joinedDate,
            username,
            email,
            sub,
          },
        },
      }
    );

    await bookClubData.collection("Users").updateOne({ _id: _id }, { $inc: { RequestsToJoinCount: 1 } });

    await bookClubData.collection("Book-Group").updateOne({ _id: getBookClub._id }, { $inc: { numberOfRequests: 1 } });
  }
};

module.exports = {
  requestsToJoin,
};
