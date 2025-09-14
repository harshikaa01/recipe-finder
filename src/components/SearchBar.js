import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => onSearch(query);
    const handleKeyPress = (e) => e.key === "Enter" && handleSearch();

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
