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

  const bookClubData = client.db("Book-Club");
  const profileData = await bookClubData.collection("Users").find().toArray();
  const { username, email, _id } = req.body;
  const getUser = profileData.filter((member) => member._id === _id);

  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim());

  const newEmail = email.replace(/\s+/g, "").trim().length < 1 ? getUser[0]?.email : email;
  const newUsername = username.replace(/\s+/g, "").trim().length < 1 ? getUser[0]?.username : username;

  const usernameMaxCharacterCount = 30;

  const checkEmailInput = () => {
    if (isEmail === false) {
      if (email.replace(/\s+/g, "").trim().length < 1) {
        return true;
      } else if (email.replace(/\s+/g, "").trim().length > 1) {
        return false;
      }
    } else if (isEmail === true) {
      return true;
    }
  };

  const isEmailValidOrEmpty = checkEmailInput();

  const checkUsername = () => {
    if (/\s/.test(username.trim()) === false) {
      return true;
    } else if (/\s/.test(username.trim()) === true) {
      return false;
    }
  };

  const isUsernameValid = checkUsername();

  if (isEmailValidOrEmpty === true && isUsernameValid === true && username.length <= usernameMaxCharacterCount) {
    const updateProfile = await bookClubData.collection("Users").updateOne(
      { _id: _id },
      {
        $set: { username: newUsername.trim(), email: newEmail.trim() },
      }
    );
    return (
      res.status(201).json({
        status: 201,
        profile: updateProfile,
        Message: `Success, update has been made`,
      }),
      client.close()
    );
  } else if (
    isEmailValidOrEmpty === false ||
    isUsernameValid === false ||
    username.length > usernameMaxCharacterCount
  ) {
    return (
      res.status(409).json({
        status: 409,
        profile: { email: email, username: username },
        message: `Either unsername surpasses 30 characters, or email or username is invalid, please correct.`,
      }),
      client.close()
    );
  }
};

module.exports = {
  updateProfile,
};
