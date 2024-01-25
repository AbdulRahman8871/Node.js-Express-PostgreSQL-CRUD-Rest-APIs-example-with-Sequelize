module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retreive All tutorials
    router.get("/", tutorials.findAll);

    // Retreive all published tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retreive a single tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a tutrial with id
    router.delete("/:id", tutorials.delete);

    // Delete all tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
}