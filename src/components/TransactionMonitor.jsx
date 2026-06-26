import React, { useState, useEffect } from 'react';
import { Search, DollarSign, CheckCircle, XCircle, ArrowRightLeft } from 'lucide-react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function TransactionMonitor() {
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, page]);

  async function fetchTransactions() {
    setLoading(true);
    try {
      const response = await fetch(`${serverBaseUrl}/admin/v1/transactions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ searchQuery, statusFilter, page, limit: 10 })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setTransactions(result.data);
        setMetrics(result.metrics);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed fetching ledger:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Financial Ledger</h1>
          <p className="text-xs text-gray-500">Monitor vehicle rental payments, references, and refunds</p>
        </div>

        {/* 1. STATS METRICS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1d26] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><DollarSign className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Gross Revenue</p>
              <h3 className="text-xl font-bold text-white">₹{metrics.totalRevenue || 0}</h3>
            </div>
          </div>
          <div className="bg-[#1a1d26] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><ArrowRightLeft className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Volume</p>
              <h3 className="text-xl font-bold text-white">{metrics.totalTransactions || 0} Attempts</h3>
            </div>
          </div>
          <div className="bg-[#1a1d26] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Success / Cancelled</p>
              <h3 className="text-lg font-bold text-white">{metrics.successfulVolume || 0} ✅ / {metrics.cancelledVolume || 0} ❌</h3>
            </div>
          </div>
        </div>

        {/* 2. CONTROLS FILTERS ROW */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#1a1d26] border border-gray-800 p-4 rounded-xl">
          <form onSubmit={(e) => { e.preventDefault(); setPage(1); fetchTransactions(); }} className="relative flex-1 w-full">
            <input 
              type="text" 
              placeholder="Search by Payment ID, customer name, or vehicle number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12141c] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          </form>

          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="bg-[#12141c] border border-gray-800 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none cursor-pointer w-full sm:w-48"
          >
            <option value="">All Statuses</option>
            <option value="booked">Booked (Paid)</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* 3. TRANSACTIONS LEDGER DATA TABLE */}
        <div className="bg-[#1a1d26] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-[#12141c] text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="p-4">Payment Reference ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Vehicle Detail</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-right">Amount Processed</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-xs">
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center text-gray-500">Refreshing ledger data matrix...</td></tr>
                ) : transactions.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-gray-500">No transaction logs match current filters.</td></tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-[#12141c]/50 transition">
                      <td className="p-4 font-mono text-amber-500 font-medium">{tx.payment_id || "N/A (Cash/Internal)"}</td>
                      <td className="p-4">
                        <div className="font-semibold text-white">{tx.user_name}</div>
                        <div className="text-[10px] text-gray-500">{tx.user_contact_number}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-200">{tx.vehicle_name} {tx.vehicle_model}</div>
                        <div className="text-[10px] font-mono text-gray-500">{tx.vehicle_number}</div>
                      </td>
                      <td className="p-4 text-gray-400">{tx.total_days} Days</td>
                      <td className="p-4 text-right text-white font-semibold">₹{tx.total_rent_cost}</td>
                      <td className="p-4 text-center">
                        {tx.booking_status === "booked" ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase">Success</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase">Void/Cancelled</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. PAGINATION FOOTER BUTTONS BLOCK */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1.5 bg-[#1a1d26] hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-[#1a1d26] text-xs font-semibold rounded-lg transition"
            >
              Prev
            </button>
            <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 bg-[#1a1d26] hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-[#1a1d26] text-xs font-semibold rounded-lg transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}