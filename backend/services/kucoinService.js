const axios = require('axios');
const BASE_URL = 'https://api.kucoin.com';

exports.fetchSpotData = async (symbol, interval, limit) => {
    const response = await axios.get(`${BASE_URL}/api/v1/market/candles`, {
        params: { symbol, interval, limit }
    });
    return response.data;
};

exports.fetchFuturesData = async (symbol, interval, limit) => {
    const response = await axios.get(`${BASE_URL}/api/v1/contracts/candles`, {
        params: { symbol, interval, limit }
    });
    return response.data;
};