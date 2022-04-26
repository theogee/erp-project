const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const pool = require("../dao/pool");

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, user);
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // check user to db, if exist return the user, else create new user and return the user
      const {
        sub: id,
        given_name: firstName,
        family_name: lastName,
        picture: profilePicture,
        email,
      } = profile._json;

      try {
        let sql = "SELECT * FROM users WHERE user_id = $1";
        let rows;
        ({ rows } = await pool.query(sql, [id]));

        if (rows.length !== 0) return done(null, rows[0]);

        sql = "INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING *";
        ({ rows } = await pool.query(sql, [
          id,
          email,
          firstName,
          lastName,
          profilePicture,
        ]));

        return done(null, rows[0]);
      } catch (err) {
        return done(err);
      }
    }
  )
);
