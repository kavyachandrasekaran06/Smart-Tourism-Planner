const express = require("express");

const {
  getDestinations,
  getDestinationById,
  createDestination,
  deleteDestination,
} = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getDestinations);

router.get("/:id", getDestinationById);

router.post("/", createDestination);

router.delete("/:id", deleteDestination);

module.exports = router;