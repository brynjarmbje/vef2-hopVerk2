'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
        );
        console.log(response);
        setMovies(response.data.movies);
      } catch (err) {
        // Handle error here
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="movies-container">
        <h1>Movies</h1>
        <ul className="movies-list">
          {movies.map((movie: { id: number; title: string }) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MoviesPage;
