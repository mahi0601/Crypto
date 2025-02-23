import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export const fetchSpotData = async (symbol, interval, limit) => {
  return axios.get(`${API_BASE_URL}/api/spot`, {
    params: { symbol, interval, limit },
  });
};

export const fetchFuturesData = async (symbol, interval, limit) => {
  return axios.get(`${API_BASE_URL}/api/futures`, {
    params: { symbol, interval, limit },
  });
};

