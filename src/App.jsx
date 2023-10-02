import { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import SearchIcon from "./assets/search.svg";
import "./App.css";
import MovieCard from "./movie_card.jsx";


const API_URL = "https://www.omdbapi.com?apikey=7087bec0";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const SearchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSearch= (e) => {
    if(e.key === "Enter")
      SearchMovies(searchTerm);
    if(e.key === "Delete")
      setSearchTerm("");
  }

  useEffect(() => {
    SearchMovies("Batman");
  }, []);


  return (
    <div className="app">
      <h1>Movie-Counter</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(e)=>handleSearch(e)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => SearchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
