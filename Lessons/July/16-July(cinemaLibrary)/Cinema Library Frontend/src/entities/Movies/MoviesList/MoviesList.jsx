import { useEffect, useState } from 'react';
import cls from './MoviesList.module.scss'
import { getMovies } from '../../../shared/api/movies';

const MoviesList = () => {
    const [movies, setMovies] = useState([])

    // переписать на async await c try catch
    useEffect(() => {
        getMovies().then((res) => setMovies(res.data))
    }, [])

  return (
    <div className={cls.MoviesList}>
      <h1>All Movies</h1>
      {movies.map(movie => (
        <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{movie.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;