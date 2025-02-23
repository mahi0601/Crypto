const axios = require('axios');
const BASE_URL = 'https://api.mexc.com';

exports.fetchSpotData = async (symbol, interval, limit) => {
    const response = await axios.get(`${BASE_URL}/api/v3/klines`, {
        params: { symbol, interval, limit }
    });
    return response.data;
};

exports.fetchFuturesData = async (symbol, interval, limit) => {
    const response = await axios.get(`${BASE_URL}/api/v3/klines`, {
        params: { symbol, interval, limit }
    });
    return response.data;
};
