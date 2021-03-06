const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const { dbKey } = require("./index");

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    await mongoose.connect(uri, mongooseOpts);
    mongoose.connection.on("connected", () => console.log("connected DB"));
  } else {
    try {
      await mongoose.connect(
        dbKey,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        },
        console.log("connected to db")
      );
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
};

module.exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
module.exports.connectDB = connectDB;
