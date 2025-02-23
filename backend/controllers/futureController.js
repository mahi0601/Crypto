const { fetchFuturesData } = require('../services/binanceService');

// exports.getFuturesData = async (req, res) => {
//     try {
//         const { symbol, interval, limit } = req.query;
//         const data = await fetchFuturesData(symbol, interval, limit);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch futures market data' });
//     }
// };

exports.getFuturesData = async (req, res) => {
  try {
    const { exchange, symbol, interval, limit } = req.query;
    if (!exchange || !symbol || !interval || !limit) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const data = await fetchFuturesData(exchange, symbol, interval, limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch futures market data" });
  }
};
