const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");

  const { username, firstName, lastName, email, favouriteBook, favGenres } = req.body;
  //Include a joined date
  const newID = username;

  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const profileData = await bookClubData.collection("Profiles").find().toArray();
  console.log(`profileData length:`, profileData.length === 0);

  const isProfileNew = profileData.every((user) => {
    if (user.username !== username && user.email !== email && isEmail === true) {
      return true;
    } else if (user.username === username || user.email === email || isEmail === false) {
      return false;
    }
  });

  if (isProfileNew === true) {
    const newProfile = await bookClubData
      .collection("Profiles")
      .insertOne(Object.assign({ _id: newID }, { username, firstName, lastName, email, favouriteBook, favGenres }));
    console.log(`newProfile:`, newProfile);
    return (
      res.status(201).json({ status: 201, profile: newProfile, message: "Success, profile created" }), client.close()
    );
  } else if (isProfileNew === false) {
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
