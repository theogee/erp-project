const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failure" }),
  (req, res) =>
    res.redirect(process.env.CLIENT_OAUTH_CALLBACK_URL + "/dashboard")
);

router.get("/success", (req, res) => {
  res.json(req.user);
});

router.get("/failure", (req, res) => {
  res.json({ success: false, msg: "Authentication failed" });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.status(200).json({
      success: true,
      msg: "Logout successfully",
    });
  });
});

module.exports = router;
