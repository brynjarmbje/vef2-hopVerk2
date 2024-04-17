'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link'; 
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

const StarsPage = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paging, setPaging] = useState<PagingInfo | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stars/?page=${currentPage}`
        );
        setStars(response.data.stars);
        setPaging(response.data.paging); // Assumes your API sends this structured paging data
      } catch (err) {
        console.error(err);
      }
    };

    fetchStars();
  }, [currentPage]); // Dependency on currentPage ensures the effect reruns when page changes

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Directly set the new page
  };

  return (
    <div className="stars-container">
      <h1>Stars</h1>
      <ul className="stars-list">
        {stars.map((star) => (
          <li key={star.id}>
            <Link href={`/stars/${star.slug}`}>{star.name}</Link>
          </li>
        ))}
      </ul>
      {paging && (
        <Pagination
          currentPage={currentPage}
          hasNext={paging.hasNext}
          hasPrevious={paging.hasPrevious}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default StarsPage;
