const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addBooks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");
  const { added_by, date_added, bookClubName, author, title, book_img, first_published } = req.body;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const profile = await bookClubData.collection("Users").findOne({ username: added_by });

  const bookAlreadyIncluded = getBookClub?.readingList?.some((match) => match?.title === title);

  const isHost = profile?.hostingBookClubs?.some((x) => added_by.includes(x?.host));

  if (bookAlreadyIncluded === false && isHost === true) {
    const bookToAdd = await bookClubData.collection("Book-Group").updateOne(
      { bookClubName: getBookClub?.bookClubName },
      {
        $push: {
          readingList: {
            bookClubName,
            title,
            book_img,
            author,
            first_published,
            date_added,
            added_by,
          },
        },
      }
    );
    await bookClubData
      .collection("Book-Group")
      .updateOne({ bookClubName: getBookClub?.bookClubName }, { $inc: { bookCount: 1 } });

    await bookClubData.collection("Users").updateOne(
      { "hostingBookClubs.bookClubName": bookClubName },
      {
        $push: {
          "hostingBookClubs.$.readingList": {
            bookClubName,
            title,
            book_img,
            author,
            first_published,
            date_added,
            added_by,
          },
        },
      }
    );

    await bookClubData
      .collection("Users")
      .updateOne({ "hostingBookClubs.bookClubName": bookClubName }, { $inc: { "hostingBookClubs.$.bookCount": 1 } });

    return (
      res.status(201).json({
        status: 201,
        addedBook: bookToAdd,
        Message: `Success, new member added`,
      }),
      client.close()
    );
  } else if (bookAlreadyIncluded === true || isHost === undefined) {
    return (
      res.status(409).json({
        status: 409,
        addedBook: title,
        message: `Either this book has already been added to the book club or user is not a host`,
      }),
      client.close()
    );
  }
};

module.exports = {
  addBooks,
};
