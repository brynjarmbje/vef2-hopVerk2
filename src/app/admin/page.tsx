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
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState({
    title: '',
    year: 0,
    url: '',
    description: '',
  });

  const handleMovie = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError('');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`,
        movieData
      );
      setMoviePostSuccess(true);
    } catch (err) {
      setError('Posting movie failed');
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleMovie} className="movie-form">
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
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default AdminPage;
