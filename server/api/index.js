const router = require('express').Router();
module.exports = router


//404 handler
router.get((req, res, next) => {
    const err = new Error("Not found.");
    err.status = 404;
    next(err);
  });