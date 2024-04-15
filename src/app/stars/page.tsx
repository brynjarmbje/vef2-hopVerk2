'use client';
import axios from 'axios';
import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';

const StarsPage = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stars`
        );
        console.log(response.data.stars);
        setStars(response.data.stars);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStars();
  }, []);

  return (
    <div className="stars-container">
      <h1>Stars</h1>
      <ul className="stars-list">
        {stars.map((star: { id: number; name: string; slug: string }) => (
          <li key={star.id}>
            <Link href={`/stars/${star.slug}`}>{star.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarsPage;
