"use client"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
 
 const useTrendingMovies = (page = 1) => {
    return useQuery({
        queryKey: ['popular-movies', page],
        queryFn: async () => {
            var res = await axios.get(`/api/movie/popular?page=${page}`)
            return res.data
        }
    })
 }

 const UseMovieTrailer = (id) => {
    return  useQuery({
        queryKey: ['movie-trailer', id],
        queryFn: async () => {
            const res = await axios.get(`/api/movie/${id}/trailer`)
            return res.data
        }

    })
 }

const UseMovieGenre = () => {
    return useQuery(
        {
            queryKey: ["movie-genre"],
            queryFn: async () => {
                const res = await axios.get(`/api/genre`)
                return res.data
            }
            
        }
    )
}

const UseMovie = (genre, lang, page) => {
    return useQuery(
        {
            queryKey: ["movie-genre", genre, lang, page],
            queryFn: async () => {
                const res = await axios.get(`/api/movie?lang=${lang}&genre=${genre}&page=${page}`)
                return res.data
            }
            
        }
    )
}



const UseMovieByGenre = (id, page) => {
    return useQuery(
        {
            queryKey: ["movie-by-genre", page, id],
            queryFn: async () => {
                const res = await axios.get(`/api/movie/genre/${id}?page=${page}`)
                return res.data
            }
            
        }
    )
}

const UseMovieDetails = (id) => {
    return useQuery(
        {
            queryKey: ["movie-details", id],
            queryFn: async () => {
                const res = await axios.get(`/api/movie/${id}`)
                return res.data
            }
            
        }
    )
}

const UseSearchMovie = (q, page) => {
    return useQuery(
        {
            queryKey: ["movie-search", q, page],
            queryFn: async () => {
                if(!page) page = 1
                if(!q){
                    return {
                        results:[

                        ]
                    }
                }
                const res = await axios.get(`/api/movie/search?q=${q}&page=${page}`)
                return res.data
            },
            initialData: { results: [] }
            
        }
    )
}

export {
    useTrendingMovies,
    UseMovieTrailer,
    UseMovieGenre,
    UseSearchMovie,
    UseMovieDetails,
    UseMovieByGenre,
    UseMovie
}