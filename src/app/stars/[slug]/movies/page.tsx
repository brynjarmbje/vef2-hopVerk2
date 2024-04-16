'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../../../styles/star.scss';

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/stars/${slug}/movies`
          ),
        ]);
        setMovies(moviesResponse.data.movies);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="starDetail">
      <h3>Movies</h3>
      <ul>
        {movies.map((movie: { id: number; title: string; slug: string }) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.slug}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
