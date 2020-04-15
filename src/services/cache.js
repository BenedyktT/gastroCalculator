const redis = require("redis");
const mongoose = require("mongoose");
const redisUrl = require("../config/index");
const { promisify } = require("util");
const client = redis.createClient(redisUrl);
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

module.exports = Cache;
