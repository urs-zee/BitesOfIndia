import { useState, useCallback } from "react";

export const useSweetsFilter = (sweets) => {
  const [filters, setFilters] = useState({
    search: "",
    priceRange: "all",
    category: "all",
  });
  const [filteredSweets, setFilteredSweets] = useState([]);

  const applyFilters = useCallback(() => {
    let result = [...sweets];
    if (filters.search) {
      result = result.filter((sweet) =>
        sweet.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.priceRange === "under-100") {
      result = result.filter((sweet) => sweet.price < 100);
    } else if (filters.priceRange === "100-300") {
      result = result.filter(
        (sweet) => sweet.price >= 100 && sweet.price <= 300
      );
    } else if (filters.priceRange === "300-plus") {
      result = result.filter((sweet) => sweet.price > 300);
    }
    if (filters.category !== "all") {
      result = result.filter((sweet) => sweet.category === filters.category);
    }

    setFilteredSweets(result);
  }, [sweets, filters]);

  const setSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  const setPriceRange = (range) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const setCategory = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    filteredSweets,
    filters,
    setSearch,
    setPriceRange,
    setCategory,
  };
};
export default useSweetsFilter;
