const passport = require("passport");
const router = require("express").Router();
const {User} = require("../database");

module.exports = router;

router.use('/google', require('../oauth2'))

router.get("/me", (req, res, next) => {
  console.log(req.user)
  res.json(req.user)
})

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    req.login(newUser, err => {
      if (err) next(err);
      else res.json(newUser);
    });
  } catch (err) {
    next(err);
  }
});

router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user.id) res.status(401).send("User not found");
    else if (!user.correctPassword(req.body.password))
      res.status(401).send("Incorrect password");
    else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.status(204).redirect('/')
})

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const userDoc = await User.findById(id);
    done(null, userDoc);
  } catch (err) {
    done(err);
  }
});
