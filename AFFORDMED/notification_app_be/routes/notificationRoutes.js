const express = require("express");
const router  = express.Router();
const { getNotifications } = require("../controllers/notificationController");

// GET /api/notifications
router.get("/notifications", getNotifications);

module.exports = router;
