const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateBookClub = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const { bookClubName, newBookClubName, newHost, members } = req.body;

  const bookClubData = client.db("Book-Club");
  const totalBookClubs = await bookClubData.collection("Book-Group").find().toArray();

  const filterBookClubs = totalBookClubs.filter((group) => group.bookClubName === bookClubName);

  //prevent host from deleting herself/himself
  const idxOfMemberToRemove =
    members[0] !== undefined
      ? filterBookClubs[0]?.members.findIndex((object) => {
          if (filterBookClubs[0]?.host !== members[0]?.username) {
            return object?._id === members[0]?._id;
          } else {
            return undefined;
          }
        })
      : undefined;

  //Update book club name
  const bookClubNaming = filterBookClubs.map((obj) => {
    let updateBookClubName;
    if (obj.bookClubName !== newBookClubName && newBookClubName?.trim().length > 0) {
      updateBookClubName = newBookClubName?.replace(/\s+/g, " ").trim();
      return updateBookClubName;
    } else if (obj?.bookClubName === newBookClubName || newBookClubName?.trim().length < 1) {
      return obj?.bookClubName;
    }
  });

  const newHostIsMember = filterBookClubs[0]?.members.some((x) => newHost.trim().includes(x?.username));

  //assign new host string isn't empty and is a member
  const hostOfBookClub = filterBookClubs.map((obj) => {
    if (obj?.host !== newHost && newHostIsMember === true) {
      return newHost?.replace(/\s+/g, " ").trim();
    } else if (newHostIsMember === false || obj[0]?.host === newHost) {
      return obj?.host;
    }
  });

  console.log(`hostOfBookClub:`, hostOfBookClub);

  if (newBookClubName?.length > 0 || newHost?.length > 0 || members?.length > 0) {
    const removedMember = await bookClubData.collection("Book-Group").updateOne(
      { _id: filterBookClubs[0]?._id },
      {
        $set: { bookClubName: bookClubNaming?.toString(), host: hostOfBookClub[0]?.toString() },
        $pull: { members: filterBookClubs[0]?.members[idxOfMemberToRemove] },
      }
    );

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: filterBookClubs[0]?._id }, { $set: { memberCount: filterBookClubs[0]?.members.length - 1 } });

    return (
      res.status(201).json({
        status: 201,
        memberRemoved: removedMember,
        Message: `Success, update has been made`,
      }),
      client.close()
    );
  } else if (
    filterBookClubs[0]?.bookClubName === bookClubName &&
    filterBookClubs[0].host === newHost &&
    members?.length < 1
  ) {
    return (
      res.status(409).json({
        status: 409,
        memberRemoved: { newBookClubName, newHost, members },
        newHost,
        members,
        message: `No changes were made`,
      }),
      client.close()
    );
  }
};

module.exports = {
  updateBookClub,
};
