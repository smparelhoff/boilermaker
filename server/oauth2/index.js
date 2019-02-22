//This boilerplate uses Google as the provider

const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../database");

module.exports = router;

//Passport's authenticate method handles redirecting to the provider
router.get("/", passport.authenticate("google", { scope: "email" }));

//Once the user signs in with google, google makes a req to our callback URL
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

//Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1337/auth/google/callback"
    },
    async (token, refreshToken, profile, done) => {
      try {
        const [user] = await User.findOrCreate({
          where: {googleId: profile.id},
          defaults: {email: profile.emails[0].value}
        });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const userDoc = await User.findById(id);
    done(null, userDoc);
  } catch (err) {
    done(err);
  }
});
