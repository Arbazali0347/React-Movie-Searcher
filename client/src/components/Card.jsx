import { useState, useContext } from "react";
import { SearchContextProvider } from "../context/SearchContext";

// 1. Details Modal Component (Pehle isay define kiya takay error na aaye)
const MovieDetails = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#111] w-full max-w-4xl rounded-[2rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 bg-black/50 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all border border-white/10"
        >
          ✕
        </button>

        <div className="w-full md:w-2/5 aspect-[2/3] md:aspect-auto">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
            className="w-full h-full object-cover" 
            alt="poster" 
          />
        </div>

        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {movie.Type}
            </span>
            <span className="text-yellow-500 font-bold">★ {movie.imdbRating}</span>
          </div>
          
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">{movie.Title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6 font-medium">
            <span>{movie.Year}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full my-auto"></span>
            <span>{movie.Runtime}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full my-auto"></span>
            <span className="text-red-500">{movie.Genre}</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-lg italic">"{movie.Plot}"</p>
          
          <div className="grid grid-cols-2 gap-6 text-sm border-t border-white/10 pt-6">
            <div>
              <p className="text-gray-500 uppercase text-[10px] tracking-widest mb-1">Director</p>
              <p className="text-white font-semibold">{movie.Director}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase text-[10px] tracking-widest mb-1">Actors</p>
              <p className="text-white font-semibold">{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Main Card Component
const Card = () => {
  const { movies, fetchMovies, apiKey, loading } = useContext(SearchContextProvider);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  const handlePreview = async (id) => {
    setIsFetchingDetails(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Error fetching details:", err);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const Skeleton = () => (
    <div className="animate-pulse bg-white/5 rounded-2xl h-[350px] border border-white/5 shadow-inner"></div>
  );

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Loading State */}
      {loading && movies.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[...Array(10)].map((_, i) => <Skeleton key={i} />)}
        </div>
      )}

      {/* No Movies Found */}
      {!loading && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 opacity-20">
          <span className="text-8xl mb-4">🎬</span>
          <h2 className="text-2xl font-bold uppercase tracking-[0.5em]">Search for Magic</h2>
        </div>
      )}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {movies.map((movie, index) => (
          <div
            key={`${movie.imdbID}-${index}`}
            onClick={() => handlePreview(movie.imdbID)}
            className="group relative cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[2/3] shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)] border border-white/5 group-hover:border-red-500/30">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=Poster+Not+Available"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={movie.Title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <button className="w-full py-2.5 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg">
                  Quick View
                </button>
              </div>
            </div>
            <div className="mt-4 px-1">
              <h3 className="text-white font-bold text-sm truncate group-hover:text-red-500 transition-colors">{movie.Title}</h3>
              <p className="text-gray-500 text-xs mt-1 font-medium">{movie.Year} • {movie.Type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {movies.length > 0 && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => fetchMovies(false)}
            disabled={loading}
            className="px-12 py-4 bg-white/5 hover:bg-red-600 text-white font-bold rounded-full border border-white/10 transition-all hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] disabled:opacity-50"
          >
            {loading ? "Loading Content..." : "Load More Movies"}
          </button>
        </div>
      )}

      {/* Modal logic */}
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {/* Mini loader jab details fetch ho rahi hon */}
      {isFetchingDetails && (
        <div className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Card;