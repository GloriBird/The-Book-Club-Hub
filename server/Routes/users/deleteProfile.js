const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");
  const profileID = req.params.id;

  const accountToRemove = await bookClubData.collection("Users").findOne({ _id: profileID });

  if (Object.values(accountToRemove).length > 0) {
    bookClubData.collection("DeletedProfiles").insertOne(accountToRemove);

    const deletedReservation = await bookClubData.collection("Users").deleteOne({ _id: profileID });
    return (
      res.status(204).json({ status: 204, account: deletedReservation, message: "Success, user logged in" }),
      client.close()
    );
  } else if (accountToRemove === null) {
    return (
      res.status(404).json({
        status: 404,
        account: signedInUser,
        Message: "User Account Not Found",
      }),
      client.close()
    );
  }
};

module.exports = {
  deleteProfile,
};
