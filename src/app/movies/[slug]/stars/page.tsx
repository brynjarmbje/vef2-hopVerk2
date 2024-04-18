'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '@/styles/movie.scss';
import Loadingsvg from '@/components/Loadingsvg';

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [stars, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    const fetchData = async () => {
      try {
        const [starsResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${slug}/stars`
          ),
        ]);
        setMovies(starsResponse.data.stars);
      } catch (err) {
        console.error(err);
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return <Loadingsvg />;  
  }

  return (
    <div className="movieDetail">
      <h3>Stars in movie</h3>
      <ul>
        {stars.map((star: { id: number; name: string; slug: string }) => (
          <li key={star.id}>
            <Link href={`/stars/${star.slug}`}>{star.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
