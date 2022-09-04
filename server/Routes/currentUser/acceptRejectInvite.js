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
  //   console.log(`profile:`, profile);
  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  //   console.log(`getBookClub:`, getBookClub);

  const findPendingUserInBookClub =
    profile !== undefined
      ? getBookClub?.pendingMembers?.filter((match) => profile?._id.includes(match?._id))
      : undefined;

  const findBookClubInvite =
    profile !== undefined
      ? profile?.bookClubInvites?.filter((match) => getBookClub?.bookClubName.includes(match?.bookClubName))
      : undefined;

  console.log(`findBookClubInvite:`, findBookClubInvite);
};

module.exports = {
  acceptRejectInvite,
};
