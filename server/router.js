const express = require("express");
const router = express.Router();

//  @route
//  @desc
//  @access        public
router.get("/", (req, res) => {
  res.send("server is up and running");
});

module.exports = router;
