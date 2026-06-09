const { fetchNotifications } = require("../services/notificationService");

/**
 * GET /api/notifications
 * Proxies the Affordmed external notifications API, supporting:
 *   - ?page=<n>
 *   - ?limit=<n>
 *   - ?notification_type=<Event|Result|Placement>
 */
async function getNotifications(req, res) {
  try {
    const params = {};
    if (req.query.page)              params.page              = req.query.page;
    if (req.query.limit)             params.limit             = req.query.limit;
    if (req.query.notification_type) params.notification_type = req.query.notification_type;

    const data = await fetchNotifications(params);
    return res.status(200).json(data);
  } catch (err) {
    console.error("[notificationController] error:", err.message);
    return res.status(err.status || 500).json({
      message: err.message || "Failed to fetch notifications",
    });
  }
}

module.exports = { getNotifications };
