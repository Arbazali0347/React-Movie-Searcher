
// ✅ Fully Responsive Navbar.jsx
import React, { useContext } from "react";
import { SeachContextProvider } from "../context/SearchContext";

const Navbar = () => {
  const { setSearchTerm, searchTerm, handleSearch } = useContext(SeachContextProvider);

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 px-4 sm:px-8 py-4 sm:py-6 bg-[#0A0A0A] border-b border-white/10 shadow-xl sticky top-0 z-40 backdrop-blur-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-widest hover:tracking-[8px] transition-all duration-500 text-center sm:text-left">
        🎥 Movie Finder
      </h1>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
        <input
          type="text"
          placeholder="Search any movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all w-52 sm:w-64"
        />

        <button
          onClick={handleSearch}
          className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;