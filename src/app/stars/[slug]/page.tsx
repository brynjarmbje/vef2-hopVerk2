import axios from 'axios';
import Link from 'next/link';
import '../../../styles/star.scss';

export async function generateStaticParams() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stars`
  );
  return response.data.stars.map((star: any) => ({
    params: {
      slug: star.slug,
    },
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/stars/${slug}`
  );
  return (
    <div className="starDetail">
      <h2>Name: {response.data.name}</h2>
      <p> Gender : {response.data.gender}</p>
      <p> Description : {response.data.description}</p>
      <p> ID : {response.data.id}</p>
      <p>
        URL : <a href={response.data.url}>{response.data.url}</a>{' '}
      </p>
      <p> Created :{response.data.created} </p>
      <p> Updated : {response.data.updated}</p>
    </div>
  );
}
