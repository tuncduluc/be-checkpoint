module.exports = app => {
    const places = require("../controllers/place.controller.js");

    var router = require("express").Router();

    router.post("/", places.create);

    router.get("/", places.findAll);

    router.get("/:id", places.findOne);

    router.put("/:id", places.update);

    router.delete("/:id", places.delete);


    app.use("/places", router);
};