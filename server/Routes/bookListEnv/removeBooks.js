const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const removeBooks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  const bookClubData = client.db("Book-Club");
  const { added_by, date_added, bookClubName, author, title, book_img, first_published } = req.body;

  const getBookClub = await bookClubData.collection("Book-Group").findOne({ bookClubName: bookClubName });
  const bookIsInBookClub = getBookClub?.readingList?.some((match) => title.includes(match?.title));

  const profile = await bookClubData.collection("Users").findOne({ username: added_by });

  //Index of book to remove from book club
  const idxOfBookToRemove =
    title.length > 0
      ? getBookClub?.readingList.findIndex((object) => {
          if (getBookClub?.host === added_by) {
            return object?.title === title;
          } else {
            return undefined;
          }
        })
      : undefined;

  //Index of book to remove from book club
  const isHost = profile?.hostingBookClubs?.some((x) => added_by.includes(x?.host));

  //Index of book to remove from user's hostingBookClubs
  const idxOfBookToRemoveFromHost =
    title.length > 0
      ? profile?.hostingBookClubs[0]?.readingList?.findIndex((object) => {
          if (isHost) {
            return object?.title === title;
          } else {
            return false;
          }
        })
      : undefined;

  if (bookIsInBookClub === true && isHost) {
    const bookToRemove = await bookClubData.collection("Book-Group").updateOne(
      { bookClubName: getBookClub?.bookClubName },
      {
        $pull: { readingList: getBookClub?.readingList[idxOfBookToRemove] },
        $inc: { bookCount: -1 },
      }
    );

    await bookClubData.collection("Users").updateOne(
      { "hostingBookClubs.bookClubName": bookClubName },
      {
        $pull: {
          "hostingBookClubs.$.readingList": profile?.hostingBookClubs[0]?.readingList[idxOfBookToRemoveFromHost],
        },
        $inc: { bookCount: -1 },
      }
    );

    return (
      res.status(201).json({
        status: 201,
        bookRemoved: bookToRemove,
        Message: `Success, book removed`,
      }),
      client.close()
    );
  } else if (bookIsInBookClub === false || isHost === false) {
    return (
      res.status(409).json({
        status: 409,
        bookRemoved: title,
        message: `${title} is not in book club`,
      }),
      client.close()
    );
  }
};

module.exports = {
  removeBooks,
};
