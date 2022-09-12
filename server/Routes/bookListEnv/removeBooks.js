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

  console.log(`title:`, title.replace(/\s+/g, "").trim().length > 0);

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

  //   console.log(`bookIsInBookClub:`, bookIsInBookClub);

  if (bookIsInBookClub === true) {
    const bookToRemove = await bookClubData.collection("Book-Group").updateOne(
      { bookClubName: getBookClub?.bookClubName },
      {
        $pull: { readingList: getBookClub?.readingList[idxOfBookToRemove] },
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
  } else if (bookIsInBookClub === false) {
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
