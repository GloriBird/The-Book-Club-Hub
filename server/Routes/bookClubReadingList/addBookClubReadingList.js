const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addBookClubReadingList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const bookClubData = client.db("Book-Club");

  const { _id, title, author, firstPublished, dateAdded } = req.body;

  const pickedBook = {
    title: title.replace(/\s+/g, " ").trim(),
    author: author.replace(/\s+/g, " ").trim(),
    firstPublished: firstPublished.replace(/\s+/g, " ").trim(),
    dateAdded: dateAdded.replace(/\s+/g, " ").trim(),
  };

  const getGroup = await bookClubData.collection("Book-Group").findOne({ _id: _id });

  const isBookInGroup = getGroup?.ReadingList?.every((book) => {
    if (book?.length < 1 || book?.title !== title) {
      return false;
    } else if (book?.length > 0 || book?.title === title) {
      return true;
    }
  });

  if (isBookInGroup === false || getGroup?.ReadingList?.length < 1) {
    const newBookAdded = await bookClubData.collection("Book-Group").updateOne(
      { _id: _id },
      {
        $push: {
          ReadingList: pickedBook,
        },
      }
    );

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: _id }, { $set: { bookCount: getGroup?.ReadingList?.length + 1 } });

    return (
      res.status(201).json({
        status: 201,
        books: newBookAdded,
        Message: `Success, new book added`,
      }),
      client.close()
    );
  } else if (isBookInGroup === true) {
    return (
      res.status(409).json({
        status: 409,
        books: title,
        message: `Either book are already in Reading list or no books were added`,
      }),
      client.close()
    );
  }
};

module.exports = { addBookClubReadingList };
