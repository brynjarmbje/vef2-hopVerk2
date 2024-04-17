'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../../../styles/movie.scss';
import Pagination from '@/components/Pagination'; 

interface Star {
  id: number;
  name: string;
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

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [stars, setStars] = useState<Star[]>([]);
  const [paging, setPaging] = useState<PagingInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${slug}/stars?page=${paging?.page || 1}`);
        setStars(response.data.stars);
        setPaging(response.data.paging);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [slug, paging?.page]);

  const handlePageChange = (newPage: number) => {
    setPaging(prev => ({ ...prev!, page: newPage }));
  };

  return (
    <div className="movieDetail">
      <h3>Stars in movie</h3>
      <ul>
        {stars.map((star) => (
          <li key={star.id}>
            <Link href={`/stars/${star.slug}`}>{star.name}</Link>
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
}
