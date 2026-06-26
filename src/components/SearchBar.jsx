
import React, { useState } from 'react';
import { Search } from 'lucide-react';
const serverBaseUrl = import.meta.env.VITE_SERVER_URL

export default function SearchBar({ setVehicleList }) {
  const [textInput, setTextInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearchTrigger(e) {
    e.preventDefault();
    setIsSearching(true);

    try {
      const response = await fetch(`${serverBaseUrl}/vehicles/v1/search`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ searchQuery: textInput })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Overwrite the home vehicle matrix state list with our filtered search arrays!
        setVehicleList(result.data);
      }
    } catch (error) {
      console.error("Search fetch loop failed:", error);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 my-8">
      <form onSubmit={handleSearchTrigger} className="relative flex items-center">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Search by brand, model, year, or location (e.g., Toyota, SUV, 2026)..."
          className="w-full px-5 py-3.5 pl-12 bg-[#1a1d26] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all duration-200"
        />
        <Search className="absolute left-4 w-5 h-5 text-gray-500" />
        
        <button
          type="submit"
          disabled={isSearching}
          className="absolute right-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-bold text-xs rounded-lg transition"
        >
          {isSearching ? "Filtering..." : "Search"}
        </button>
      </form>
    </div>
  );
}