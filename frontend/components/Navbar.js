// components/Navbar.js
import React from 'react';

export default function Navbar({ setExchange, setMarketType }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Crypto Market Dashboard</h1>
      <div className="flex space-x-4">
        <select
          onChange={(e) => setExchange(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="binance">Binance</option>
          <option value="bybit">ByBit</option>
          <option value="mexc">MEXC</option>
          <option value="kucoin">KuCoin</option>
        </select>
        <select
          onChange={(e) => setMarketType(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="spot">Spot Market</option>
          <option value="futures">Futures Market</option>
        </select>
      </div>
    </nav>
  );
}
