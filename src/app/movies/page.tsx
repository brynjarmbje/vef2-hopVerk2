'use client'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination'; 

interface Movie {
  id: number;
  title: string;
  slug: string;
}

interface PagingInfo {
  page: number;
  count: number;
  hasNext: boolean;
  next: number;
  hasPrevious: boolean;
  previous: number;
  total: number;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [paging, setPaging] = useState<PagingInfo | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies?page=${paging?.page || 1}`);
        setMovies(response.data.movies);
        setPaging(response.data.paging);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [paging?.page]);

  const handlePageChange = (newPage: number) => {
    setPaging(prev => ({ ...prev!, page: newPage }));
  };

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.slug}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      {paging && (
        <Pagination
          currentPage={paging.page}
          hasNext={paging.hasNext}
          hasPrevious={paging.hasPrevious}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MoviesPage;
