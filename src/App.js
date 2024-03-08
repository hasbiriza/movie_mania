import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  // Loading Pertama Kali
  useEffect(() => {
    getMovieList().then((result) => {
      console.log(result);
      setPopularMovies(result);
    });
  }, []);


// Per 1  Card Popular Movies
  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            alt="Poster Movie"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">Release : {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };




  // Search Movie
  const search = async(q) => {
    const query = await searchMovie (q)
    setPopularMovies(query.results)
    console.log({query : query});
  };

  // BENTUKAN PAGENYA //
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hasbi Movie Mania Jos!</h1>
        <input
          onChange={({ target }) => search(target.value)}
          placeholder="Film Kesayanganmu?"
          className="Movie-search"
        />
        <div className="Movie-container">
        <PopularMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;
