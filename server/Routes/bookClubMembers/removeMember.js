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
  const findBookClub = await bookClubData.collection("Book-Group").find().toArray();

  const filterBookClubs = findBookClub.filter((group) => group.bookClubName === bookClubName);
  console.log(`filterBookClubs:`, filterBookClubs?.[0]);
  //prevent host from deleting herself/himself
  const idxOfMemberToRemove =
    member[0] !== undefined
      ? filterBookClubs[0]?.members.findIndex((object) => {
          if (filterBookClubs[0]?.host !== member[0]?.username) {
            return object?._id === member[0]?._id;
          } else {
            return undefined;
          }
        })
      : undefined;

  console.log(`idxOfMemberToRemove:`, idxOfMemberToRemove);

  if (member?.length > 0) {
    const removedMember = await bookClubData.collection("Book-Group").updateOne(
      { _id: filterBookClubs[0]?._id },
      {
        $pull: { members: filterBookClubs[0]?.members[idxOfMemberToRemove] },
      }
    );

    if (member?.length > 0) {
      const currentMember = await bookClubData.collection("Users").updateOne(
        { _id: member?.[0]._id },
        {
          $pull: { bookClubs: filterBookClubs?.[0] },
        }
      );
    }

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: filterBookClubs[0]?._id }, { $inc: { memberCount: -1 } });

    // await bookClubData
    //   .collection("Book-Group")
    //   .updateOne({ _id: filterBookClubs[0]?._id }, { $set: { memberCount: filterBookClubs[0]?.members.length - 1 } });

    return (
      res.status(201).json({
        status: 201,
        memberRemoved: removedMember,
        Message: `Success, update has been made`,
      }),
      client.close()
    );
  } else if (member?.length < 1) {
    return (
      res.status(409).json({
        status: 409,
        memberToRemove: member,
        message: `No member was removed`,
      }),
      client.close()
    );
  }
};

module.exports = {
  removeMember,
};
