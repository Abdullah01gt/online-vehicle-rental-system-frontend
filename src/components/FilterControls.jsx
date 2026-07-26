import React from 'react';

export default function FilterControls({
  locations,
  selectedLocation,
  setSelectedLocation,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 mb-8 flex flex-wrap gap-4 items-center justify-between">
      {/* Location Filter */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-400 font-medium">Location:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-[#1a1d26] border border-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 transition"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Price Sorting */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-400 font-medium">Sort by Price:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-[#1a1d26] border border-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 transition"
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}