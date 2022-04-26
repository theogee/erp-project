const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");
const redisClient = new Redis();

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: Number(process.env.COOKIE_LIFETIME) || 300000,
    sameSite: "lax",
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
});
