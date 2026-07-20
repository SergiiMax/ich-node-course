import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:3000/api"
})

const getMovies = () => api.get('/movies')
const getMovie = (id) => api.get(`/movies/${id}`)
const createMovie = (movie) => api.post('/movies', movie)

export { getMovie, getMovies, createMovie }