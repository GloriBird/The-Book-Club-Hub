const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const removeMember = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const { member, bookClubName } = req.body;

  const bookClubData = client.db("Book-Club");
  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const profile = await bookClubData.collection("Users").findOne({ _id: member[0]?._id });

  //For BookClub
  const idxOfMemberToRemove =
    member[0] !== undefined
      ? getBookClub?.members.findIndex((object) => {
          if (getBookClub?.host !== member[0]?.username) {
            return object?._id === member[0]?._id;
          } else {
            return undefined;
          }
        })
      : undefined;

  //For User
  const idxOfBookClubToRemove = profile?.bookClubs.findIndex((object) => object?.bookClubName === bookClubName);

  const userAlreadyMember = getBookClub?.members.some((match) => member[0]?._id.includes(match?._id));

  if (getBookClub?.host !== member[0]?.username && userAlreadyMember) {
    const removedMemberFromBookClub = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub?._id },
      {
        $pull: { members: getBookClub?.members[idxOfMemberToRemove] },
        $inc: { memberCount: -1 },
      }
    );

    await bookClubData.collection("Users").updateOne(
      { _id: member[0]?._id },
      {
        $pull: { bookClubs: profile?.bookClubs[idxOfBookClubToRemove] },
        $inc: { numberOfBookClubs: -1 },
      }
    );

    return (
      res.status(201).json({
        status: 201,
        removedFromBookClub: removedMemberFromBookClub,
        Message: `Success, member has been removed`,
      }),
      client.close()
    );
  } else if (
    (getBookClub?.host === member[0]?.username && userAlreadyMember) ||
    getBookClub?.host === member[0]?.username ||
    userAlreadyMember === false
  ) {
    return (
      res.status(409).json({
        status: 409,
        memberToRemove: member,
        message: `Either member was already removed or host is trying to remove themself`,
      }),
      client.close()
    );
  }
};

module.exports = {
  removeMember,
};
