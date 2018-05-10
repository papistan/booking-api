const express = require("express");
const router = express.Router();

const jobController = require("../../controllers/jobs");
const truckController = require("../../controllers/trucks");

router.get("/jobs", jobController.all);
router.get("/trucks", truckController.all);
router.post("/jobCreate", jobController.create);
router.post("/truckCreate", truckController.create);

module.exports = router;
