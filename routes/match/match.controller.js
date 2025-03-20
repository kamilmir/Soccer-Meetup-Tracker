const express = require("express");
const router = express.Router();
const { MatchModel: Match } = require("../../model/match.model");

// Create a new match
router.post("/create", async (req, res) => {
  const { title, time, place, maxPeople } = req.body;

  const newMatch = new Match({
    title,
    time,
    place,
    maxPeople,
  });

  try {
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Register a person to a match
router.post("/register/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (match.listPeopleSubscribed.length >= match.maxPeople) {
      return res.status(400).json({ message: "Match is full" });
    }

    match.listPeopleSubscribed.push(req.userId);
    await match.save();
    res.status(200).json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/available", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  try {
    const matches = await Match.aggregate([
      {
        $addFields: {
          availableSpots: {
            $subtract: ["$maxPeople", { $size: "$listPeopleSubscribed" }],
          },
        },
      },
      { $sort: { availableSpots: -1 } },
      { $skip: skip },
      { $limit: size },
    ]);

    res.status(200).json(matches);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all matches with filters and pagination
router.get("/", async (req, res) => {
  const { date, location, availableSpots, page = 1, size = 10 } = req.query;
  const skip = (page - 1) * size;

  let filter = {};

  if (date) {
    filter.time = {
      $gte: new Date(date + "T00:00:00.000Z"),
      $lt: new Date(date + "T23:59:59.999Z"),
    };
  }

  if (location) {
    filter.place = location;
  }

  try {
    const matches = await Match.aggregate([
      {
        $addFields: {
          availableSpots: {
            $subtract: ["$maxPeople", { $size: "$listPeopleSubscribed" }],
          },
        },
      },
      { $match: filter },
      { $sort: { availableSpots: -1 } },
      { $skip: skip },
      { $limit: parseInt(size) },
    ]);

    res.status(200).json(matches);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
