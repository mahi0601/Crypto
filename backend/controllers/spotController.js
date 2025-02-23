const { fetchSpotData } = require('../services/binanceService');

// exports.getSpotData = async (req, res) => {
//     try {
//         const { symbol, interval, limit } = req.query;
//         const data = await fetchSpotData(symbol, interval, limit);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch spot market data' });
//     }
// };

exports.getSpotData = async (req, res) => {
  try {
    const { symbol, interval, limit } = req.query;
    if (!symbol || !interval || !limit) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const data = await fetchSpotData(symbol, interval, limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spot market data" });
  }
};
