const axios = require('axios');
const BASE_URL = 'https://api.bybit.com';

exports.fetchSpotData = async (symbol, interval, limit) => {
    const response = await axios.get(`${BASE_URL}/v2/public/kline/list`, {
        params: { symbol, interval, limit }
    });
    return response.data;
};

exports.fetchFuturesData = async (symbol, interval, limit) => {
    const response = await axios.get(`${BASE_URL}/v2/public/kline/list`, {
        params: { symbol, interval, limit }
    });
    return response.data;
};