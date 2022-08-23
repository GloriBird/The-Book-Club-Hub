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

  const getBookGroup = await bookClubData.collection("book-club-groups").find().toArray();

  const { bookClubName } = req.body;
  const groupName = bookClubName.trim();

  req.body["_id"] = uuidv4();
  const newID = req.body["_id"];

  const dateCreated = moment().format("MMMM Do YYYY");

  const bookClubNameAvailable = getBookGroup.every((group) => {
    if (group.bookClubName !== bookClubName) {
      return true;
    } else if (group.bookClubName === bookClubName) {
      return false;
    }
  });

  if (bookClubNameAvailable === true && groupName.length > 0) {
    const newBookClub = await bookClubData
      .collection("book-groups")
      .insertOne(Object.assign({ _id: newID }, { dateCreated: dateCreated }, { groupName }));
    res.status(201).json({ status: 201, bookClub: newBookClub, message: "Success, profile created" }), client.close();
  } else if (bookClubNameAvailable === false || groupName.length < 1) {
    return (
      res.status(409).json({
        status: 409,
        bookClub: bookClubName,
        message: `Either this book club name is already taken or the field is empty`,
      }),
      client.close()
    );
  }
};

module.exports = {
  createBookClub,
};
