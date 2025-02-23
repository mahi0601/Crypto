// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 6002 });
// wss.on('connection', ws => {
//     ws.send(JSON.stringify({ message: 'Connected to Futures WebSocket' }));
// });
// exports.startFuturesWebSocket = () => wss;

const WebSocket = require("ws");

const exchanges = {
  binance: "wss://fstream.binance.com/ws",
  bybit: "wss://stream.bybit.com/v5/public/linear",
  mexc: "wss://contract.mexc.com/ws",
  kucoin: "wss://api-futures.kucoin.com/ws/v1",
};

const clients = [];
let retryDelay = 5000; // Start with 5 seconds

function startFuturesWebSocket() {
    const ws = new WebSocket("wss://fstream.binance.com/ws/btcusdt@trade");

    ws.on("open", () => {
        console.log("Connected to Binance futures WebSocket");
        retryDelay = 5000; // Reset on successful connection
    });

    ws.on("message", (data) => {
        console.log("Received Futures Trade Data:", data);
    });

    ws.on("error", (error) => {
        console.error("WebSocket Error:", error);
    });

    ws.on("close", () => {
        console.log("WebSocket closed. Reconnecting in", retryDelay / 1000, "seconds...");
        setTimeout(() => {
            retryDelay = Math.min(retryDelay * 2, 60000); // Exponential backoff, max 60 seconds
            startFuturesWebSocket();
        }, retryDelay);
    });
}


module.exports = { startFuturesWebSocket };


