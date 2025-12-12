import { useState } from "react";
import "./SearchFilter.css";

function SearchFilter({ onSearch, sweets }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const categories = Array.from(
    new Set(sweets?.map((s) => s.category) || [])
  ).filter(Boolean);

  const handleFilter = (e) => {
    const value = e.target.value;
    setPriceRange(value);
    onSearch?.(searchTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search mithai by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch?.(e.target.value);
        }}
      />

      <select
        className="filter-select"
        onChange={handleFilter}
        value={priceRange}
      >
        <option value="all">All Prices</option>
        <option value="under-100">Under ₹100</option>
        <option value="100-300">₹100 - ₹300</option>
        <option value="300-plus">Above ₹300</option>
      </select>
    </div>
  );
}

export default SearchFilter;
