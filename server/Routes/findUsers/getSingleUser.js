const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSingleUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const otherProfiles = req.params.id;

  const singleUserProfile = await bookClubData.collection("Profiles").findOne({ _id: otherProfiles });

  singleUserProfile
    ? (res.status(200).json({ status: 200, account: singleUserProfile, message: "Success, user logged in" }),
      client.close())
    : (res.status(404).json({
        status: 404,
        account: otherProfiles,
        Message: "User Account Not Found",
      }),
      client.close());
};

module.exports = {
  getSingleUser,
};
