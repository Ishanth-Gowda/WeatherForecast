import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== "") {
            onSearch(city);
            setCity("");
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;