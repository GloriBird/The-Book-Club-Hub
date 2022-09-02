const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Users");

  const { bookClubName, newBookClubName, newHost } = req.body;

  const accountFound = await bookClubData.collection("Users").findOne({ username: signedInUser });

  accountFound
    ? (res.status(200).json({ status: 200, account: accountFound, message: "Success, user logged in" }), client.close())
    : (res.status(404).json({
        status: 404,
        account: signedInUser,
        Message: "User Account Not Found",
      }),
      client.close());
};

module.exports = {
  updateProfile,
};
