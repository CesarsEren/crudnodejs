//Imports
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  /*if (req.session.usuario == null && req.session.password == null) {
      res.redirect("/");
    } else {*/
  res.sendFile(path.join(__dirname, "index.html"));
  //  }
});

//Exports
module.exports = router;
