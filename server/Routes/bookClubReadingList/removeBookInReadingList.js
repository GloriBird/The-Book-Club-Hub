const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const removeBookInReadingList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const bookClubData = client.db("Book-Club");

  const totalBookClubs = await bookClubData.collection("Book-Group").find().toArray();

  const { title, memberUsername } = req.body;

  const getBookClub = totalBookClubs?.filter((group) => group?.ReadingList.some((list) => title?.includes(list.title)));

  const isMemberHost = getBookClub[0]?.host === memberUsername;

  const idxOfBookToRemove = isMemberHost
    ? getBookClub[0]?.ReadingList?.findIndex((object) => {
        return object?.title === title;
      })
    : undefined;

  if (isMemberHost === true && idxOfBookToRemove !== undefined) {
    const removedBook = await bookClubData.collection("Book-Group").updateOne(
      { _id: getBookClub[0]?._id },
      {
        $pull: { ReadingList: getBookClub[0]?.ReadingList[idxOfBookToRemove] },
      }
    );

    await bookClubData
      .collection("Book-Group")
      .updateOne({ _id: getBookClub[0]?._id }, { $set: { bookCount: getBookClub[0]?.ReadingList.length - 1 } });

    return (
      res.status(201).json({
        status: 201,
        removedBook: removedBook,
        Message: `Success, book has been removed`,
      }),
      client.close()
    );
  } else if (isMemberHost !== true || idxOfBookToRemove === undefined) {
    return (
      res.status(409).json({
        status: 409,
        removedBook: { title, memberUsername },
        message: `Either the book is not in the reading list or member removing the book is not the host`,
      }),
      client.close()
    );
  }
};

module.exports = {
  removeBookInReadingList,
};
