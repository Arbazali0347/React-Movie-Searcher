// ✅ Fully Responsive Card.jsx
import { React, useState, useContext } from "react";
import { SeachContextProvider } from "../context/SearchContext";

const Card = () => {
  const { movies, fetchMovies, apiKey } = useContext(SeachContextProvider);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePreview = async (movie) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?t=${movie.Title}&apikey=${apiKey}`);
      const data = await res.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
        setShowDetails(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  return (
    <div className="w-full flex flex-col items-center py-10">
      {movies.length === 0 ? (
        <h2 className="text-white text-2xl sm:text-3xl opacity-70 text-center px-4">No Movies Found</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full px-4 sm:px-6 md:px-10">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 backdrop-blur-xl p-4"
            >
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 text-center hover:tracking-widest transition-all duration-300">
                {movie.Title}
              </h3>

              <div className="w-full h-64 sm:h-72 overflow-hidden rounded-xl mb-4">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                />
              </div>

              <p className="text-white/70 mb-3 text-center text-sm sm:text-base">{movie.Year}</p>

              <button
                onClick={() => handlePreview(movie)}
                className="w-full py-2 rounded-xl bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-sm sm:text-base"
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedMovie && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 z-50 animate-fadeIn">
          <div className="bg-[#111] rounded-2xl p-4 sm:p-6 w-full max-w-xl sm:max-w-3xl shadow-2xl border border-white/20 animate-scaleIn">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedMovie.Poster}
                className="w-40 sm:w-64 rounded-xl shadow-lg mx-auto md:mx-0"
                alt={selectedMovie.Title}
              />

              <div className="flex-1 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center md:text-left">{selectedMovie.Title}</h2>
                <p className="mb-2 text-sm sm:text-base"><strong>Year: </strong>{selectedMovie.Year}</p>
                <p className="mb-4 opacity-80 text-sm leading-relaxed sm:text-base">
                  <strong>Plot:</strong> {selectedMovie.Plot}
                </p>

                <button
                  onClick={closeDetails}
                  className="mt-3 px-5 py-2 rounded-xl bg-white/10 hover:bg-white hover:text-black transition-all duration-300 font-semibold w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {movies.length > 0 && (
        <button
          onClick={() => fetchMovies(false)}
          className="mt-10 px-6 sm:px-8 py-3 rounded-xl bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Card;
