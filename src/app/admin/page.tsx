'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter, redirect } from 'next/navigation';

type UserData = {
  userId: number;
  username: string;
  name: string;
  profilePicture: string;
  isAdmin: boolean;
};

type PatchMovieData = {
  slug?: string;
  title?: string;
  year?: number;
  url?: string;
  description?: string;
};

type Error = {
  postMovieError?: string;
  patchMovieError?: string;
};

const AdminPage = () => {
  const userDataString = localStorage.getItem('userData');
  const token = localStorage.getItem('token');
  axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  let userData: UserData | null = null;

  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  if (!userData?.isAdmin) {
    redirect('/');
  }

  const router = useRouter();

  const [moviePostSuccess, setMoviePostSuccess] = useState(false);

  const [error, setError] = useState<Error>({
    postMovieError: '',
    patchMovieError: '',
  });

  const [movieData, setMovieData] = useState({
    title: '',
    year: 2024,
    url: '',
    description: '',
  });

  const handleMovie = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`,
        movieData
      );
      setMoviePostSuccess(true);
    } catch (err) {
      setError({ postMovieError: 'Posting movie failed' });
    }
  };
  /*

  const [moviePatchSuccess, setMoviePatchSuccess] = useState(false);
  const [patchMovieData, setPatchMovieData] = useState<PatchMovieData>({});

  const handlePatchMovie = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${patchMovieData.slug}`,
        patchMovieData
      );
      setMoviePatchSuccess(true);
    } catch (err) {
      setError({ patchMovieError: 'Patching movie failed' });
    }
  };

  let data = JSON.stringify({
    title: 'Bobbi fer í búðina',
    description: 'Bobbi er stór strákur',
  });

  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: 'https://vef2-2024-h1.onrender.com/movies/bobbi-fer-i-budina',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTMzNjQwMjQsImV4cCI6MTcxMzQ1MDQyNH0.y1jStkdTfJAPfzpa4pF6ygxisZ6g_ZKyNA1_WtBhXBY',
    },
    data: data,
  };
  

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

    */

  return (
    <>
      <div className="form-container">
        <h1>Post Movie</h1>
        <form onSubmit={handleMovie} className="post-form">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={movieData.title}
              onChange={(e) =>
                setMovieData({ ...movieData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              value={movieData.year}
              onChange={(e) =>
                setMovieData({ ...movieData, year: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="url">Url</label>
            <input
              id="url"
              type="link"
              value={movieData.url}
              onChange={(e) =>
                setMovieData({ ...movieData, url: e.target.value })
              }
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={movieData.description}
              onChange={(e) =>
                setMovieData({ ...movieData, description: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Post
          </button>
          {moviePostSuccess && (
            <p className="success-message">
              Movie {movieData.title} successfully posted
            </p>
          )}
          {error.postMovieError && (
            <p className="error-message">{error.postMovieError}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default AdminPage;
