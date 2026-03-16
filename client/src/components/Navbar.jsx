import React, { useContext, useState } from "react";
import { SearchContextProvider } from "../context/SearchContext";

const Navbar = () => {
  const { setSearchTerm, searchTerm, handleSearch } = useContext(SearchContextProvider);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 border border-white/10 ${isFocused ? 'bg-black/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,0,0,0.1)]' : 'bg-white/5 backdrop-blur-md'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-white">
            MOVIE<span className="text-red-500">FLIX</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center w-full md:w-auto mt-4 md:mt-0 gap-3">
          <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'w-full md:w-96' : 'w-full md:w-64'}`}>
            <input
              type="text"
              placeholder="Search movies, series..."
              value={searchTerm}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl text-white placeholder-white/40 outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;