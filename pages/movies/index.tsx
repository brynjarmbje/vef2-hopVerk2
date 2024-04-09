import React from 'react';
import Navbar from '../../src/app/Navbar';

export async function getServerSideProps() {
  // Fetch the list of movies using the API URL
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`);
  // const movies = await res.json();

  // For now, let's use an empty array
  const movies: never[] = [];

  return {
    props: { movies },
  };
}

const MoviesList = ({ movies }) => {
  return (
    <>
      <Navbar />
      <h1>Movies</h1>
      {/* Render movies here */}
    </>
  );
};

export default MoviesList;