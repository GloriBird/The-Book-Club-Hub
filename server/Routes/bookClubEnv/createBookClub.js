const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createBookClub = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const getBookGroup = await bookClubData.collection("Book-Group").find().toArray();

  // const bookClubArr = [];
  const { bookClubName, host, members } = req.body;
  const profile = await bookClubData.collection("Users").findOne({ _id: members?.[0]._id });
  console.log(`profile:`, profile);
  // bookClubArr.push(req.body);
  console.log(`members ID:`, members?.[0]._id);
  req.body["_id"] = uuidv4();
  const newID = req.body["_id"];

  const dateCreated = moment().format("MMMM Do YYYY");

  const bookClubNameAvailable = getBookGroup.every((group) => {
    if (
      group.bookClubName.replace(/\s+/g, "").trim().toLowerCase() !==
      bookClubName.replace(/\s+/g, "").trim().toLowerCase()
    ) {
      return true;
    } else if (group.bookClubName === bookClubName.trim()) {
      return false;
    }
  });

  // console.log(`bookClubNameAvailable:`, bookClubNameAvailable);

  const isBookClubNamed = bookClubName.trim().length > 0;
  const isThereHost = host?.trim().length > 0;

  const containEmptyValue = members.some((userInfo) => Object.values(userInfo).some((val) => val.trim().length === 0));

  const readingList = [];
  const pendingMembers = [];
  const joinRequestFromUsers = [];
  const hostingBookClubsCount = 0;

  if (bookClubNameAvailable && isThereHost && isBookClubNamed && containEmptyValue === false) {
    const getTrimmedData = (hostInfo) => {
      if (hostInfo && typeof hostInfo === "object") {
        Object.keys(hostInfo).map((key) => {
          if (typeof hostInfo[key] === "object") {
            getTrimmedData(hostInfo[key]);
          } else if (typeof hostInfo[key] === "string") {
            hostInfo[key] = hostInfo[key].replace(/\s+/g, " ").trim();
          }
        });
      }
      return hostInfo;
    };

    const trimmedMember = getTrimmedData(members);

    const BookClubCreated = {
      bookClubName: bookClubName.replace(/\s+/g, " ").trim(),
      host: host.replace(/\s+/g, " ").trim(),
      members: trimmedMember,
      memberCount: members.length,
      readingList,
      bookCount: readingList.length,
      pendingMembers: pendingMembers,
      pendingMembersCount: pendingMembers.length,
      joinRequestFromUsers,
      numberOfRequestsToJoin: joinRequestFromUsers.length,
    };

    const newBookClub = await bookClubData
      .collection("Book-Group")
      .insertOne(Object.assign({ _id: newID }, { dateCreated: dateCreated }, BookClubCreated));

    const updateToHost = await bookClubData.collection("Users").updateOne(
      { _id: members?.[0]._id },
      {
        $push: { hostingBookClubs: BookClubCreated },
      }
    );

    await bookClubData.collection("Users").updateOne({ _id: members?.[0]._id }, { $inc: { hostingBookClubsCount: 1 } });

    res
      .status(201)
      .json({ status: 201, bookClub: newBookClub, user: updateToHost, message: "Success, profile created" }),
      client.close();
  } else if (
    bookClubNameAvailable === false ||
    isBookClubNamed === false ||
    isThereHost === false ||
    containEmptyValue === true ||
    isEmail === false
  ) {
    return (
      res.status(409).json({
        status: 409,
        bookClub: bookClubName,
        message: `Either this book club name is already taken or there is an empty field`,
      }),
      client.close()
    );
  }
};

module.exports = {
  createBookClub,
};
