// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 6001 });
// wss.on('connection', ws => {
//     ws.send(JSON.stringify({ message: 'Connected to Spot WebSocket' }));
// });
// exports.startSpotWebSocket = () => wss;

const WebSocket = require("ws");

const exchanges = {
  binance: "wss://stream.binance.com:9443/ws",
  bybit: "wss://stream.bybit.com/v5/public/spot",
  mexc: "wss://wbs.mexc.com/ws",
  kucoin: "wss://api.kucoin.com/ws/v1",
};

const clients = [];

function startSpotWebSocket() {
  for (const [exchange, url] of Object.entries(exchanges)) {
    const ws = new WebSocket(url);

    ws.on("open", () => {
      console.log(`Connected to ${exchange} spot WebSocket`);
      if (exchange === "binance") {
        ws.send(JSON.stringify({ method: "SUBSCRIBE", params: ["btcusdt@trade"], id: 1 }));
      }
    });

    ws.on("message", (data) => {
        console.log(`Spot data from ${exchange}:`, data.toString());
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data.toString());
          }
        });
      });
      

    ws.on("error", (error) => {
      console.error(`Error in ${exchange} spot WebSocket:`, error);
    });

    ws.on("close", () => {
      console.log(`Disconnected from ${exchange}, attempting to reconnect...`);
      setTimeout(() => startSpotWebSocket(), Math.min(60000, retryDelay * 2)); // Exponential Backoff

    });

    clients.push(ws);
  }
}

module.exports = { startSpotWebSocket };
