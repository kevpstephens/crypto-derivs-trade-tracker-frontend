"use client";

import { useState, useEffect } from "react";
import { tradingApi, Trade } from "@/lib/api";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

export default function Dashboard() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentTrades();
  }, []);

  const fetchRecentTrades = async () => {
    try {
      const response = await tradingApi.getRecentTrades(10);
      setTrades(response.data);
    } catch (err) {
      setError(
        "Failed to fetch trades. Make sure your backend is running on localhost:8000"
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalTrades: trades.length,
    longTrades: trades.filter((t) => t.side === "long").length,
    shortTrades: trades.filter((t) => t.side === "short").length,
    totalVolume: trades.reduce(
      (sum, t) => sum + parseFloat(t.size) * parseFloat(t.price),
      0
    ),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Trading Dashboard</h1>
        <p className="text-gray-400">
          Monitor your crypto derivatives positions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Trades</p>
              <p className="text-2xl font-bold">{stats.totalTrades}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Long Positions</p>
              <p className="text-2xl font-bold text-green-400">
                {stats.longTrades}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Short Positions</p>
              <p className="text-2xl font-bold text-red-400">
                {stats.shortTrades}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Volume</p>
              <p className="text-2xl font-bold">
                ${stats.totalVolume.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Recent Trades</h2>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-400">Loading trades...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchRecentTrades}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        ) : trades.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400">
              No trades yet. Create your first trade!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Side
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Leverage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {trade.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          trade.side === "long"
                            ? "bg-green-900 text-green-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {trade.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {parseFloat(trade.size).toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      ${parseFloat(trade.price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {trade.leverage}x
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-300">
                        {trade.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
