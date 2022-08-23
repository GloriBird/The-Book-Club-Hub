const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signedInProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const signedInUser = req.params.id;

  const accountFound = await bookClubData.collection("Profiles").findOne({ _id: signedInUser });

  //This is for Testing

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
  signedInProfile,
};
