const axios = require("axios");
const BASE_URL = "https://api.binance.com";
const BASE_URLs = 'https://fapi.binance.com';
exports.fetchSpotData = async (symbol, interval, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v3/klines`, {
      params: { symbol, interval, limit },
      timeout: 10000, // Increase timeout to 10 seconds
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Binance spot data:", error.message);
    throw new Error("Failed to fetch data from Binance.");
  }
};


exports.fetchFuturesData = async (symbol, interval, limit) => {
    try {
        console.log("Fetching Binance Futures data for:", { symbol, interval, limit });
        
        const response = await axios.get(`${BASE_URLs}/fapi/v1/klines`, {
            params: { symbol, interval, limit },
            timeout: 10000,
        });

        console.log("Data received successfully!");
        return response.data;
    } catch (error) {
        console.error("Error fetching Binance Futures data:", error.response?.data || error.message);
        throw new Error("Failed to fetch data from Binance Futures API");
    }
};
