const { MongoClient } = require("mongodb");
require("dotenv").config();
const fetch = require("node-fetch");

const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//https://covers.openlibrary.org/b/olid/OL36102660M-M.jpg

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  const weeklyTrendingBooks = await fetch("https://openlibrary.org/trending/weekly.json");

  try {
    const weeklyBookData = await weeklyTrendingBooks.json();
    await client.connect();
    const bookClubData = client.db("Book-Club");

    const selectProps = (...props) => {
      return (obj) => {
        const newObj = {};
        props.forEach((paramsReceived) => {
          newObj[paramsReceived] = obj[paramsReceived];
          newObj["_id"] = uuidv4();
        });
        return newObj;
      };
    };

    const newData = weeklyBookData.works.map(
      selectProps("key", "title", "first_publish_year", "cover_edition_key", "author_name", "author_key")
    );

    await bookClubData.collection("Weekly-Trending-Books").insertMany(newData);

    client.close();
  } catch (error) {
    console.log(`Error:`, error.message);
  }
};

batchImport();
