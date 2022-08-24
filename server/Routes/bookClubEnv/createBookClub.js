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

  const getBookGroup = await bookClubData.collection("book-groups").find().toArray();

  const bookClubArr = [];
  const { bookClubName, host, members } = req.body;
  bookClubArr.push(req.body);

  req.body["_id"] = uuidv4();
  const newID = req.body["_id"];

  const dateCreated = moment().format("MMMM Do YYYY");

  const bookClubNameAvailable = getBookGroup.every((group) => {
    if (group.bookClubName !== bookClubName.trim()) {
      return true;
    } else if (group.bookClubName === bookClubName.trim()) {
      return false;
    }
  });

  const isBookClubNamed = bookClubName.trim().length > 0;
  const isThereHost = host.trim().length > 0;
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(members[0].email.trim());

  const containEmptyValue = members.some((userInfo) => Object.values(userInfo).some((val) => val.trim().length === 0));

  if (bookClubNameAvailable && isThereHost && isBookClubNamed && containEmptyValue === false && isEmail) {
    const getTrimmedData = (obj) => {
      if (obj && typeof obj === "object") {
        Object.keys(obj).map((key) => {
          if (typeof obj[key] === "object") {
            getTrimmedData(obj[key]);
          } else if (typeof obj[key] === "string") {
            obj[key] = obj[key].trim();
          }
        });
      }
      return obj;
    };

    const trimmedMember = getTrimmedData(members);

    const newBookClub = await bookClubData
      .collection("book-groups")
      .insertOne(
        Object.assign(
          { _id: newID },
          { dateCreated: dateCreated },
          { bookClubName: bookClubName.trim(), host: host.trim(), members: trimmedMember },
          { memberCount: 1 }
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
