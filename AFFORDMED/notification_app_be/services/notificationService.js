const axios = require("axios");
const { NOTIFICATIONS_API_URL } = require("../config/constants");

const AUTH_API_URL = "http://4.224.186.213/evaluation-service/auth";

// Cache the token from environment variables
let currentAccessToken = process.env.ACCESS_TOKEN;

/**
 * Fetches a new token from the auth endpoint using client credentials.
 */
async function refreshToken() {
  console.log("[Auth] Attempting to acquire/refresh token from auth endpoint...");
  try {
    const response = await axios.post(AUTH_API_URL, {
      companyName: "Afford Medical Technologies Private Limited",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      ownerName: "rajat verma",
      ownerEmail: "rajat.23b0131113@abes.ac.in",
      name: "rajat verma",
      email: "rajat.23b0131113@abes.ac.in",
      rollNo: "2300320130188",
      accessCode: "cXuqht"
    });
    
    currentAccessToken = response.data.access_token;
    console.log("[Auth] Token successfully acquired and cached.");
    return currentAccessToken;
  } catch (err) {
    console.error("[Auth] Failed to acquire token:", err.response?.data || err.message);
    // If we fail to fetch, and don't have a token, we must throw.
    if (!currentAccessToken) {
      throw new Error("Failed to acquire access token");
    }
    return currentAccessToken;
  }
}

/**
 * Calls the Affordmed external notifications API.
 * @param {object} params  - query params: page, limit, notification_type
 * @returns {Promise<object>} raw API response data
 */
async function fetchNotifications(params = {}) {
  try {
    if (!currentAccessToken) {
      await refreshToken();
    }

    console.log(`[NotificationService] Fetching notifications from external API...`);
    const response = await axios.get(NOTIFICATIONS_API_URL, { 
      params,
      headers: {
        Authorization: `Bearer ${currentAccessToken}`
      }
    });
    console.log(`[NotificationService] Successfully fetched notifications.`);
    return response.data;
  } catch (err) {
    const status = err.response?.status || 502;
    console.error(`[NotificationService] Fetch failed with status ${status}: ${err.message}`);
    
    // Handle Unauthorized / Forbidden errors by attempting a token refresh
    if (status === 401 || status === 403) {
      console.log(`[NotificationService] Token expired or invalid. Triggering refresh...`);
      try {
        await refreshToken();
        const retryResponse = await axios.get(NOTIFICATIONS_API_URL, {
          params,
          headers: {
            Authorization: `Bearer ${currentAccessToken}`
          }
        });
        console.log(`[NotificationService] Retry successful after token refresh.`);
        return retryResponse.data;
      } catch (retryErr) {
        console.error(`[NotificationService] Retry failed: ${retryErr.message}`);
        const finalError = new Error("Authentication failed with external API after retry");
        finalError.status = retryErr.response?.status || 401;
        throw finalError;
      }
    }

    const error  = new Error(err.response?.data?.message || err.message || "External API unavailable");
    error.status = status;
    throw error;
  }
}

module.exports = { fetchNotifications };
