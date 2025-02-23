// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import './table.module.css';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

// export default function Table() {
//     const [marketData, setMarketData] = useState([]);

//     useEffect(() => {
//         axios.get(`${API_BASE_URL}/api/spot`, {
//             params: { symbol: "BTCUSDT", interval: "1m", limit: 100 },
//         })
//         .then(response => setMarketData(response.data))
//         .catch(error => console.error("API Error:", error));
//     }, []);

//     return (
//         <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4 text-white text-center">Market Data</h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//                     <thead>
//                         <tr className="bg-indigo-700 text-white text-sm leading-normal">
//                             <th className="py-3 px-6 text-left">Time</th>
//                             <th className="py-3 px-6 text-left">Open</th>
//                             <th className="py-3 px-6 text-left">High</th>
//                             <th className="py-3 px-6 text-left">Low</th>
//                             <th className="py-3 px-6 text-left">Close</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-700 text-sm font-medium">
//                         {marketData.map((data, index) => (
//                             <tr key={index} className={index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-200 hover:bg-gray-300"}>
//                                 <td className="py-3 px-6 text-gray-900">{new Date(data[0]).toLocaleString()}</td>
//                                 <td className="py-3 px-6 text-green-600 font-medium">{parseFloat(data[1]).toFixed(2)}</td>
//                                 <td className="py-3 px-6 text-blue-600 font-medium">{parseFloat(data[2]).toFixed(2)}</td>
//                                 <td className="py-3 px-6 text-red-600 font-medium">{parseFloat(data[3]).toFixed(2)}</td>
//                                 <td className="py-3 px-6 text-purple-700 font-bold">{parseFloat(data[4]).toFixed(2)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
// components/Table.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

export default function Table({ exchange, marketType }) {
    const [marketData, setMarketData] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/${exchange}/${marketType}`, {
            params: { symbol: "BTCUSDT", interval: "1m", limit: 100 },
        })
        .then(response => setMarketData(response.data))
        .catch(error => console.error("API Error:", error));
    }, [exchange, marketType]);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Market Data</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-indigo-700 text-white text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Time</th>
                            <th className="py-3 px-6 text-left">Open</th>
                            <th className="py-3 px-6 text-left">High</th>
                            <th className="py-3 px-6 text-left">Low</th>
                            <th className="py-3 px-6 text-left">Close</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-medium">
                        {marketData.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-200 hover:bg-gray-300"}>
                                <td className="py-3 px-6 text-gray-900">{new Date(data[0]).toLocaleString()}</td>
                                <td className="py-3 px-6 text-green-600 font-medium">{parseFloat(data[1]).toFixed(2)}</td>
                                <td className="py-3 px-6 text-blue-600 font-medium">{parseFloat(data[2]).toFixed(2)}</td>
                                <td className="py-3 px-6 text-red-600 font-medium">{parseFloat(data[3]).toFixed(2)}</td>
                                <td className="py-3 px-6 text-purple-700 font-bold">{parseFloat(data[4]).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
