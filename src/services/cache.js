const redis = require("redis");
const localUrl = require("../config/index");
const { promisify } = require("util");

let client;

if (process.env.REDIS_URL) {
  const rtg = require("url").parse(process.env.REDIS_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  client = redis.createClient(localUrl.redisUrl);
}
const killRedis = async () => {
  await new Promise((resolve) => {
    client.quit(() => {
      resolve();
    });
  });
};
client.hget = promisify(client.hget);
class Cache {
  constructor(model) {
    this.model = model;
  }
  async getCache(id = "all") {
    const cached = await client.hget(this.model, id);
    return cached;
  }
  async setCache(result, id = "all") {
    await client.hset(this.model, id, JSON.stringify(result));
  }
  static async clearCache() {
    await client.hdel("recipes", "all");
  }
}

module.exports = { Cache, killRedis };
