const express = require("express");
const router=express.Router();
const { fetchHealth } = require("../controllers/health.controller");


router.get("/health-check", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date()
  });
});
router.get('/health', fetchHealth);

module.exports = router;