import React, { createContext, useState } from 'react'

export const SeachContextProvider = createContext()
const apiKey = process.env.VITE_API_KEY


const SearchContext = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const fetchMovies = async (newSearch = false) => {
        if (!searchTerm) return;

        const pageToFetch = newSearch ? 1 : page;
        const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&page=${pageToFetch}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.Response === "True") {
                if (newSearch) {
                    setMovies(data.Search);
                    console.log(data.Search);
                    setPage(2); // next page will be 2
                } else {
                    setMovies(prev => [...prev, ...data.Search]);
                    setPage(prev => prev + 1); // page increment
                }
            } else {
                alert("❌ No movies found!");
                setMovies([]);
            }
        } catch (err) {
            console.error("❌ Error:", err);
        }
    };

    const handleSearch = () => {
        fetchMovies(true); // true for new search
    };

    const value = {
        searchTerm,
        setSearchTerm,
        movies,
        handleSearch,
        fetchMovies,
        apiKey

    }
    return (
        <div>
            <SeachContextProvider.Provider value={value}>
                {children}
            </SeachContextProvider.Provider>
        </div>
    )
}

export default SearchContext