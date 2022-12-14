const { MongoClient } = require("mongodb");
require("dotenv").config();
const moment = require("moment");
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const reqBodyArray = [];
  Object.keys(req.body).forEach((keyValue) => (req.body[keyValue] = req.body[keyValue].trim()));
  reqBodyArray.push(req.body);

  const { username, email, sub } = req.body;

  req.body["_id"] = uuidv4();
  const newID = req.body["_id"];
  const joinedDate = moment().format("MMMM Do YYYY");

  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.replace(/\s+/g, "").trim());

  const profileData = await bookClubData.collection("Users").find().toArray();

  const isProfileNew = profileData.every((user) => {
    if (user.username === username || user.email === email) {
      return false;
    } else if (user.username !== username && user.email !== email) {
      return true;
    }
  });

  const containEmptyValue = reqBodyArray.some((userInfo) =>
    Object.values(userInfo).some((val) => val.trim().length === 0)
  );

  const bookClubInvites = [];
  const bookClubs = [];
  const bookClubsToJoinPending = [];

  if (isProfileNew === true && containEmptyValue === false && isEmail === true) {
    const newProfile = await bookClubData.collection("Users").insertOne(
      Object.assign(
        { _id: newID.trim() },
        { joinedDate: joinedDate.trim() },
        {
          username: username?.replace(/\s+/g, "").trim(),
          email,
          sub,
          bookClubInvites,
          numberOfClubInvites: bookClubInvites.length,
          bookClubs,
          numberOfBookClubs: bookClubs.length,
          bookClubsToJoinPending,
          numberOfRequests: bookClubsToJoinPending.length,
        }
      )
    );

    return (
      res.status(201).json({ status: 201, profile: newProfile, message: "Success, profile created" }), client.close()
    );
  } else if (isProfileNew === false || containEmptyValue === true || isEmail === false) {
    return (
      res.status(409).json({
        status: 409,
        profile: { email: email },
        message: `Either username is taken, email is not valid, or some fields are missing`,
      }),
      client.close()
    );
  }
};

module.exports = {
  createProfile,
};
