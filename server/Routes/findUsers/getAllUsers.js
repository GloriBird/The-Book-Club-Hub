const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const getAllAccounts = await bookClubData.collection("Users").find().toArray();

  if (getAllAccounts.length > 0) {
    return res.status(200).json({ status: 200, account: getAllAccounts, message: "Success" }), client.close();
  } else {
    return (
      res.status(404).json({
        status: 404,
        account: getAllAccounts,
        Message: "No users in data",
      }),
      client.close()
    );
  }
};

module.exports = {
  getAllUsers,
};
