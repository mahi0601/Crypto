
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:6001", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 3000,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("connect_error", (error) => {
  console.error("WebSocket Connection Error:", error.message);
});

socket.on("error", (error) => {
  console.error("WebSocket Transport Error:", error.message);
});

export default function LiveTrades() {
  const [trades, setTrades] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const socket = io("ws://localhost:6001", {
    transports: ["websocket"], // Force WebSocket transport
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 3000,
  });
  
  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });
  
  socket.on("connect_error", (error) => {
    console.error("WebSocket Connection Error:", error.message);
  });
  
  socket.on("error", (error) => {
    console.error("WebSocket Transport Error:", error.message);
  });
  
  useEffect(() => {
    socket.on("crypto-data", (data) => {
      console.log("Received data:", data);
      if (data && data.data) {
        setTrades((prevTrades) => [
          {
            exchange: data.exchange,
            price: data.data.p || "N/A",
            volume: data.data.q || "N/A",
            time: data.data.T ? new Date(data.data.T).toLocaleTimeString() : "N/A",
          },
          ...prevTrades.slice(0, 19)
        ]);
      }
    });

    return () => {
      socket.off("crypto-data");
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/binance/spot", {
        params: { symbol: "BTCUSDT", interval: "1m", limit: 100 },
      })
      .then((response) => {
        console.log("Historical Data:", response.data);
        const formattedData = response.data.map((entry) => ({
          time: new Date(entry[0]).toLocaleTimeString(),
          open: entry[1],
          high: entry[2],
          low: entry[3],
          close: entry[4],
          volume: entry[5],
        }));
        setHistoricalData(formattedData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#333" }}>Live Data</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Open</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>High</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Low</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Close</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Volume</th>
          </tr>
        </thead>
        <tbody>
          {historicalData.map((entry, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.time}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.open}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.high}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.low}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.close}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
