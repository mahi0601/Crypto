// // frontend/components/Chart.js
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import {
//     Chart as ChartJS,
//     LineElement,
//     PointElement,
//     LinearScale,
//     TimeScale,
//     CategoryScale,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, CategoryScale, Title, Tooltip, Legend);

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

// export default function ChartComponent() {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [{
//             label: 'BTC/USDT Price',
//             data: [],
//             borderColor: 'rgba(75,192,192,1)',
//             backgroundColor: 'rgba(75,192,192,0.2)',
//             borderWidth: 2,
//             pointRadius: 3,
//             tension: 0.3,
//         }]
//     });

//     useEffect(() => {
//         axios.get(`${API_BASE_URL}/api/spot`, {
//             params: { symbol: "BTCUSDT", interval: "1m", limit: 100 },
//         })
//         .then(response => {
//             const labels = response.data.map(d => new Date(d[0]).toLocaleTimeString());
//             const data = response.data.map(d => d[4]);
//             setChartData({
//                 labels,
//                 datasets: [{
//                     label: 'BTC/USDT Price',
//                     data,
//                     borderColor: 'rgba(75,192,192,1)',
//                     backgroundColor: 'rgba(75,192,192,0.2)',
//                     borderWidth: 2,
//                     pointRadius: 3,
//                     tension: 0.3,
//                 }]
//             });
//         })
//         .catch(error => console.error("API Error:", error));
//     }, []);

//     return (
//         <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
//             <h2 className="text-xl font-bold text-gray-700 text-center mb-4">BTC/USDT Price Chart</h2>
//             <Line data={chartData} />
//         </div>
//     );
// }

// // frontend/components/Table.js
// components/Chart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, CategoryScale, Title, Tooltip, Legend);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export default function Chart({ exchange, marketType }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Price',
            data: [],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
        }]
    });

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/${exchange}/${marketType}`, {
            params: { symbol: "BTCUSDT", interval: "1m", limit: 100 },
        })
        .then(response => {
            setChartData({
                labels: response.data.map(item => new Date(item[0]).toLocaleTimeString()),
                datasets: [{
                    ...chartData.datasets[0],
                    data: response.data.map(item => item[4])
                }]
            });
        })
        .catch(error => console.error("API Error:", error));
    }, [exchange, marketType]);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Market Trend</h2>
            <Line data={chartData} />
        </div>
    );
}
