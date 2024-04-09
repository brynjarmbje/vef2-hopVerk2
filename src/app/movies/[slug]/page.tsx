import axios from 'axios';
import MoviesPage from '../page';
import { describe } from 'node:test';

export async function generateStaticParams() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
  );
  return response.data.movies.map((movie: any) => ({
    params: {
      slug: movie.slug,
    },
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${slug}`
  );
  console.log('this is the response from slug', response.data);
  return (
    <div>
      <h2>Movie Title: {response.data.title}</h2>
      <p> Year : {response.data.year}</p>
      <p> Description : {response.data.description}</p>
      <p> ID : {response.data.id}</p>
      <p> URL : {response.data.url}</p>
      <p> Created :{response.data.created} </p>
      <p> Updated : {response.data.updated}</p>
    </div>
  );
}
