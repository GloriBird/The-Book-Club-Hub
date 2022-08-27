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

  const bookClubArr = [];
  const { bookClubName, host, members } = req.body;
  bookClubArr.push(req.body);

  req.body["_id"] = uuidv4();
  const newID = req.body["_id"];

  const dateCreated = moment().format("MMMM Do YYYY");

  const bookClubNameAvailable = getBookGroup.every((group) => {
    if (group.bookClubName.replace(/\s+/g, "").trim() !== bookClubName.replace(/\s+/g, "").trim()) {
      return true;
    } else if (group.bookClubName === bookClubName.trim()) {
      return false;
    }
  });

  console.log(`bookClubNameAvailable:`, bookClubNameAvailable);

  const isBookClubNamed = bookClubName.trim().length > 0;
  const isThereHost = host.trim().length > 0;
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(members[0].email.replace(/\s+/g, "").trim());

  const containEmptyValue = members.some((userInfo) => Object.values(userInfo).some((val) => val.trim().length === 0));

  const ReadingList = [];

  if (bookClubNameAvailable && isThereHost && isBookClubNamed && containEmptyValue === false && isEmail) {
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

    const newBookClub = await bookClubData.collection("Book-Group").insertOne(
      Object.assign(
        { _id: newID },
        { dateCreated: dateCreated },
        {
          bookClubName: bookClubName.replace(/\s+/g, " ").trim(),
          host: host.replace(/\s+/g, " ").trim(),
          members: trimmedMember,
          ReadingList,
        },
        { memberCount: members.length },
        { bookCount: ReadingList.length }
      )
    );
    res.status(201).json({ status: 201, bookClub: newBookClub, message: "Success, profile created" }), client.close();
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
