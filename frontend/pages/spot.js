import React from 'react';
import Chart from '../components/Chart';
import Table from '../components/Table';
import Navbar from '../components/Navbar';

export default function Spot() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-4">Spot Market Data</h1>
      <Chart />
      <Table />
    </div>
  );
}
