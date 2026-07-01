"use client"

import Loading from "@/components/Loading";
import { Movie_carousel } from "@/components/Movie_carousel";
import Movie_container from "@/components/Movie_container";
import MoviePagination from "@/components/MoviePagination";
import { useTrendingMovies } from "@/hooks/movies";


import { useState } from "react";


export default function Home() {
  const [page, setPage] = useState(1)
  const {data: movies, isLoading} = useTrendingMovies(page)
  if(isLoading){
    return(
      <Loading/>
    )
  }
  return (
      <main>
        <Movie_carousel />
        <Movie_container movies={movies} />
        {movies?.total_pages>1 && <MoviePagination page={page} setPage={setPage} totalPages={movies.total_pages}/>}
      </main >
  );
}
