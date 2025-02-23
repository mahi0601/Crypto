import React from "react";

export default function ExchangeSelector({ setExchange, setMarketType }) {
  return (
    <div className="mb-4 flex justify-center gap-4">
      <select
        onChange={(e) => setExchange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="binance">Binance</option>
        <option value="bybit">ByBit</option>
        <option value="mexc">MEXC</option>
        <option value="kucoin">KuCoin</option>
      </select>

      <select
        onChange={(e) => setMarketType(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="spot">Spot Market</option>
        <option value="futures">Futures Market</option>
      </select>
    </div>
  );
}
