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

  const { bookClubName, newBookClubName, host, newHost, members } = req.body;

  const bookClubData = client.db("Book-Club");
  const totalBookClubs = await bookClubData.collection("Book-Group").find().toArray();

  const filterBookClubs = totalBookClubs.filter((group) => group.bookClubName === bookClubName);

  const bookClubNaming = filterBookClubs.map((obj) => {
    const updateBookClubName = Object.assign({}, obj);
    if (obj.bookClubName !== newBookClubName && newBookClubName.trim().length > 0) {
      updateBookClubName.bookClubName = newBookClubName.replace(/\s+/g, " ").trim();
      return updateBookClubName;
    } else if (obj.bookClubName === newBookClubName || newBookClubName.trim().length < 1) {
      return filterBookClubs;
    }
  });

  const newHostIsMember = filterBookClubs[0].members.some((x) => newHost.trim().includes(x.username));
  console.log(`newHostIsMember:`, newHostIsMember);

  // const hostOfBookClub = filterBookClubs.map((obj) => {
  //   const updateHost = Object.assign({}, obj);
  //   if (obj.host !== newHost) {
  //     updateHost.host = newHost.replace(/\s+/g, " ").trim();
  //     return updateHost;
  //   } else if (obj.host === newHost || newBookClubName.trim().length < 1) {
  //     return filterBookClubs;
  //   }
  // });

  // const hostOfBookClub = filterBookClubs.map((obj) => {
  //   const updateHost = Object.assign({}, obj);
  //   if (obj.host !== newHost) {
  //     obj.members.some((member) => {
  //       if (newHost.includes(member.username)) {
  //         updateHost.host = newHost.replace(/\s+/g, " ").trim();
  //       } else {
  //         return filterBookClubs;
  //       }
  //     });
  //   } else if (obj.host === newHost || newBookClubName.trim().length < 1) {
  //     return filterBookClubs;
  //   }
  // });

  // console.log(`filterBookClubs:`, filterBookClubs[0].members.includes(newHost));
  // console.log(`hostOfBookClub:`, hostOfBookClub);

  // console.log(`New Book Club Name:`, newBookClubName);
  // console.log(`New Host:`, hostOfBookClub);

  // console.log(`New Book Club Name:`, bookClubNaming);
  //if it's the main host, then update.
};

module.exports = {
  updateBookClub,
};
