import cls from './AddMovie.module.scss'
import { createMovie } from '../../../shared/api/movies';
import { useState } from 'react';

const AddMovie = () => {
    const [ form, setForm ] =useState({
        title: '',
        year: '',
        genre: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const newMovie = {
            title: form.title,
            year: Number(form.year),
            genre: form.genre
        }

        createMovie(newMovie).then(console.log).catch(console.error);
    }

  return (
    <div className={cls.AddMovie}>
      <form onSubmit={handleSubmit}>
        <input type="text" name='title' value={form.title} onChange={handleChange}/>
        <input type="text" name='year' value={form.year} onChange={handleChange}/>
        <input type="text" name='genre' value={form.genre} onChange={handleChange}/>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddMovie;