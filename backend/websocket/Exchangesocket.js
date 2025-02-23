const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const exchanges = {
  binance: "wss://stream.binance.com:9443/ws/btcusdt@trade",
  bybit: "wss://stream.bybit.com/v5/public/spot",
  mexc: "wss://wbs.mexc.com/ws",
  kucoin: "wss://api.kucoin.com/ws/v1",
};

const clients = new Set();
const exchangeSockets = {};

function connectExchangeWebSocket(exchange, url) {
  const ws = new WebSocket(url);
  ws.on("open", () => {
    console.log(`Connected to ${exchange} WebSocket`);
    if (exchange === "binance") {
        const message = { method: "SUBSCRIBE", params: ["btcusdt@trade"], id: 1 };
        ws.send(JSON.stringify(message));
    }
});

ws.on("message", (data) => {
    const msg = JSON.parse(data);
    if (msg.id === 1 && msg.result === null) {
        console.log("Binance Subscription Confirmed");
    }
});


  
  ws.on("message", (data) => {
    console.log(`Received data from ${exchange}`);
    broadcastToClients(data.toString());
  });

  ws.on("error", (error) => {
    console.error(`Error in ${exchange} WebSocket:`, error);
  });

  ws.on("close", () => {
    console.log(`${exchange} WebSocket closed. Reconnecting in 5s...`);
    setTimeout(() => startSpotWebSocket(), Math.min(60000, retryDelay * 2)); // Exponential Backoff

  });

  exchangeSockets[exchange] = ws;
}

function broadcastToClients(data) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

wss.on("connection", (ws) => {
  console.log("New frontend client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

// Start exchange connections
for (const [exchange, url] of Object.entries(exchanges)) {
  connectExchangeWebSocket(exchange, url);
}

server.listen(5000, () => {
  console.log("WebSocket server running on ws://localhost:5000");
});
