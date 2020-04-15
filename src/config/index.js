module.exports = {
  apiKey: process.env.API_KEY,
  apiId: process.env.API_ID,
  dbKey: process.env.MONGO_URI,
  redisUrl:
    process.env.NODE_ENV === "production"
      ? process.env.REDIS_URL
      : "redis://127.0.0.1:6379",
};
