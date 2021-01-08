//Imports
const express = require("express");
const router = express.Router();
const tareadao = require("../sql/tareadao");

router.get("/", (req, res) => {
  tareadao.getTareas().then((result) => {
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  //const { tarea_nombre } = req.body;
  //console.log(tarea_nombre);
  //res.json(tarea_nombre);
  tareadao.addTarea(req.body).then((result) => {
    //res.status(201).json(result);
    res.redirect("/");
  });
});

router.get("/estado", (req, res) => {
  //const { tarea_nombre } = req.body;
  console.log(req.query);
  //res.json(tarea_nombre);//params
  tareadao
    .desactivarTarea(req.query["estado"], req.query["id"])
    .then((result) => {
      //res.status(201).json(result);
      res.redirect("/");
    });
});

router.put("/:id", (req, res) => {
  tareadao.updateTarea(req.body, req.params["id"]).then((result) => {
    res.status(201).json(result);
  });
});

router.get("/:id", (req, res) => {
  tareadao.getTarea(req.params["id"]).then((result) => {
    res.send(result[0]);
  });
});

//Exports
module.exports = router;
