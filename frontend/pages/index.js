import React, { useState } from "react";
import Chart from "../components/Chart";
import ExchangeSelector from "../components/ExchageSelector";
import LiveTrades from "../components/LiveTrades";

export default function Home() {
  const [exchange, setExchange] = useState("binance");
  const [marketType, setMarketType] = useState("spot");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Crypto Market Dashboard</h1>
      <ExchangeSelector setExchange={setExchange} setMarketType={setMarketType} />
      <Chart exchange={exchange} marketType={marketType} />
      <LiveTrades exchange={exchange} marketType={marketType} />
    </div>
  );
}
