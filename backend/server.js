// // const express = require("express");
// // const http = require("http");
// // const cors = require("cors");
// // const { Server } = require("socket.io");
// // const WebSocket = require("ws");
// // const axios = require("axios");
// // require("dotenv").config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;
// // const API_PORT = 5050;
// // const WS_PORT = 6001;

// // const corsOptions = {
// //   origin: "*",
// //   methods: ["GET", "POST"],
// //   allowedHeaders: ["Content-Type"],
// // };

// // app.use(cors(corsOptions));
// // app.use(express.json());

// // const apiServer = http.createServer(app);
// // const io = new Server(apiServer, {
// //   cors: {
// //     origin: "*",
// //     methods: ["GET", "POST"],
// //   },
// //   transports: ["websocket"],
// // });

// // const exchanges = {
// //   binance: "wss://stream.binance.com:9443/ws/btcusdt@trade",
// //   bybit: "wss://stream.bybit.com/v5/public/spot",
// //   mexc: "wss://wbs.mexc.com/ws",
// //   kucoin: null,
// // };

// // const exchangeSockets = {};
// // const reconnectDelay = 5000;

// // async function getKuCoinWebSocketURL() {
// //   try {
// //     const response = await axios.post("https://api.kucoin.com/api/v1/bullet-public");
// //     const { token, instanceServers } = response.data.data;
// //     if (instanceServers && instanceServers.length > 0) {
// //       return `${instanceServers[0].endpoint}?token=${token}`;
// //     }
// //   } catch (error) {
// //     console.error("Failed to fetch KuCoin WebSocket URL", error);
// //   }
// //   return null;
// // }

// // async function connectExchangeWebSocket(exchange, url) {
// //   if (exchange === "kucoin" && !url) {
// //     url = await getKuCoinWebSocketURL();
// //     if (!url) {
// //       console.error("Skipping KuCoin WebSocket connection due to missing URL");
// //       return;
// //     }
// //   }

// //   const ws = new WebSocket(url);

// //   ws.on("open", () => {
// //     console.log(`Connected to ${exchange} WebSocket`);
// //     if (exchange === "binance") {
// //       const message = { method: "SUBSCRIBE", params: ["btcusdt@trade"], id: 1 };
// //       ws.send(JSON.stringify(message));
// //     }
// //   });

// //   ws.on("message", (data) => {
// //     try {
// //       const msg = JSON.parse(data);
// //       io.emit("crypto-data", { exchange, data: msg });
// //     } catch (error) {
// //       console.error("Error parsing message", error);
// //     }
// //   });

// //   ws.on("error", (error) => {
// //     console.error(`WebSocket error on ${exchange}:`, error);
// //   });

// //   ws.on("close", () => {
// //     console.warn(`${exchange} WebSocket closed. Reconnecting in ${reconnectDelay / 1000} seconds...`);
// //     setTimeout(() => connectExchangeWebSocket(exchange, url), reconnectDelay);
// //   });

// //   exchangeSockets[exchange] = ws;
// // }

// // Object.entries(exchanges).forEach(async ([exchange, url]) => {
// //   await connectExchangeWebSocket(exchange, url);
// // });

// // io.on("connection", (socket) => {
// //   console.log("Client connected to WebSocket");
// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //   });
// // });

// // app.get("/api/binance/spot", async (req, res) => {
// //   try {
// //     const { symbol, interval, limit } = req.query;
// //     const response = await axios.get(
// //       `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
// //     );
// //     res.json(response.data);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error fetching Binance Spot market data" });
// //   }
// // });

// // apiServer.listen(PORT, () => {
// //   console.log(`API Server running on port ${API_PORT}`);
// //   console.log(`WebSocket server running on ws://localhost:${WS_PORT}`);
// // });
// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// const WebSocket = require("ws");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const API_PORT = 5050;
// const WS_PORT = 6001;

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"],
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// const apiServer = http.createServer(app);
// const io = new Server(apiServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket"],
// });

// const exchanges = {
//   binance: "wss://stream.binance.com:9443/ws/btcusdt@trade",
//   bybit: "wss://stream.bybit.com/v5/public/spot",
//   mexc: "wss://wbs.mexc.com/ws",
//   kucoin: null,
// };

// const exchangeSockets = {};
// const reconnectDelay = 5000;

// async function getKuCoinWebSocketURL() {
//   try {
//     const response = await axios.post("https://api.kucoin.com/api/v1/bullet-public");
//     const { token, instanceServers } = response.data.data;
//     if (instanceServers && instanceServers.length > 0) {
//       return `${instanceServers[0].endpoint}?token=${token}`;
//     }
//   } catch (error) {
//     console.error("Failed to fetch KuCoin WebSocket URL", error);
//   }
//   return null;
// }

// async function connectExchangeWebSocket(exchange, url) {
//   if (exchange === "kucoin" && !url) {
//     url = await getKuCoinWebSocketURL();
//     if (!url) {
//       console.error("Skipping KuCoin WebSocket connection due to missing URL");
//       return;
//     }
//   }

//   const ws = new WebSocket(url);

//   ws.on("open", () => {
//     console.log(`Connected to ${exchange} WebSocket`);
//     if (exchange === "binance") {
//       const message = { method: "SUBSCRIBE", params: ["btcusdt@trade"], id: 1 };
//       ws.send(JSON.stringify(message));
//     }
//   });

//   ws.on("message", (data) => {
//     try {
//       const msg = JSON.parse(data);
//       io.emit("crypto-data", { exchange, data: msg });
//     } catch (error) {
//       console.error("Error parsing message", error);
//     }
//   });

//   ws.on("error", (error) => {
//     console.error(`WebSocket error on ${exchange}:`, error);
//   });

//   ws.on("close", () => {
//     console.warn(`${exchange} WebSocket closed. Reconnecting in ${reconnectDelay / 1000} seconds...`);
//     setTimeout(() => connectExchangeWebSocket(exchange, url), reconnectDelay);
//   });

//   exchangeSockets[exchange] = ws;
// }

// Object.entries(exchanges).forEach(async ([exchange, url]) => {
//   await connectExchangeWebSocket(exchange, url);
// });

// io.on("connection", (socket) => {
//   console.log("Client connected to WebSocket");
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // ✅ **Fix: Add API Route for Binance Spot Data**
// app.get("/api/binance/spot", async (req, res) => {
//   try {
//     const { symbol, interval, limit } = req.query;
//     const response = await axios.get(
//       `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching Binance Spot market data" });
//   }
// });

// // ✅ **Fix: Add API Route for Binance Futures Data**
// app.get("/api/binance/futures", async (req, res) => {
//   try {
//     const { symbol, interval, limit } = req.query;
//     const response = await axios.get(
//       `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching Binance Futures market data:", error);
//     res.status(500).json({ error: "Error fetching Binance Futures market data" });
//   }
// });

// apiServer.listen(API_PORT, () => {
//   console.log(`API Server running on port ${API_PORT}`);
//   console.log(`WebSocket server running on ws://localhost:${WS_PORT}`);
// });
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const WebSocket = require("ws");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_PORT = 5050;
const WS_PORT = 6001;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

const apiServer = http.createServer(app);
const io = new Server(apiServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

const exchanges = {
  binance: "wss://stream.binance.com:9443/ws/btcusdt@trade",
  bybit: "wss://stream.bybit.com/v5/public/spot",
  mexc: "wss://wbs.mexc.com/ws",
  kucoin: null,
};

const exchangeSockets = {};
const reconnectDelay = 5000;

async function getKuCoinWebSocketURL() {
  try {
    const response = await axios.post("https://api.kucoin.com/api/v1/bullet-public");
    const { token, instanceServers } = response.data.data;
    if (instanceServers && instanceServers.length > 0) {
      return `${instanceServers[0].endpoint}?token=${token}`;
    }
  } catch (error) {
    console.error("Failed to fetch KuCoin WebSocket URL", error);
  }
  return null;
}

async function connectExchangeWebSocket(exchange, url) {
  if (exchange === "kucoin" && !url) {
    url = await getKuCoinWebSocketURL();
    if (!url) {
      console.error("Skipping KuCoin WebSocket connection due to missing URL");
      return;
    }
  }

  const ws = new WebSocket(url);

  ws.on("open", () => {
    console.log(`Connected to ${exchange} WebSocket`);
    if (exchange === "binance") {
      const message = { method: "SUBSCRIBE", params: ["btcusdt@trade"], id: 1 };
      ws.send(JSON.stringify(message));
    }
  });

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data);
      io.emit("crypto-data", { exchange, data: msg });
    } catch (error) {
      console.error("Error parsing message", error);
    }
  });

  ws.on("error", (error) => {
    console.error(`WebSocket error on ${exchange}:`, error);
  });

  ws.on("close", () => {
    console.warn(`${exchange} WebSocket closed. Reconnecting in ${reconnectDelay / 1000} seconds...`);
    setTimeout(() => connectExchangeWebSocket(exchange, url), reconnectDelay);
  });

  exchangeSockets[exchange] = ws;
}

Object.entries(exchanges).forEach(([exchange, url]) => {
  connectExchangeWebSocket(exchange, url);
});

io.on("connection", (socket) => {
  console.log("Client connected to WebSocket");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/api/binance/spot", async (req, res) => {
  try {
    const { symbol, interval, limit } = req.query;
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Binance Spot market data" });
  }
});

app.get("/api/binance/futures", async (req, res) => {
  try {
    const { symbol, interval, limit } = req.query;
    const response = await axios.get(
      `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Binance Futures market data:", error);
    res.status(500).json({ error: "Error fetching Binance Futures market data" });
  }
});

apiServer.listen(API_PORT, () => {
  console.log(`API Server running on port ${API_PORT}`);
  console.log(`WebSocket server running on ws://localhost:${WS_PORT}`);
});
