import React, { createContext, useState, useCallback } from 'react';

export const SearchContextProvider = createContext();
const apiKey = import.meta.env.VITE_API_KEY;

const SearchContext = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async (isNewSearch = false) => {
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        const pageToFetch = isNewSearch ? 1 : page;
        const url = `https://www.omdbapi.com/?s=${searchTerm.trim()}&apikey=${apiKey}&page=${pageToFetch}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.Response === "True") {
                if (isNewSearch) {
                    setMovies(data.Search);
                    setPage(2);
                } else {
                    setMovies(prev => [...prev, ...data.Search]);
                    setPage(prev => prev + 1);
                }
            } else if (isNewSearch) {
                setMovies([]); // Clear movies if nothing found on new search
            }
        } catch (err) {
            console.error("❌ Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => fetchMovies(true);

    return (
        <SearchContextProvider.Provider value={{ 
            searchTerm, setSearchTerm, movies, handleSearch, fetchMovies, loading, apiKey 
        }}>
            {children}
        </SearchContextProvider.Provider>
    );
};

export default SearchContext;