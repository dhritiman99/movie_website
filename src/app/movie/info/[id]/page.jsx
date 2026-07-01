"use client"
export const dynamic = 'force-dynamic';
import React from "react"
import { useParams } from "next/navigation"
import { UseMovieDetails, UseMovieTrailer } from "@/hooks/movies"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Globe, DollarSign, Loader2, Play, ExternalLink } from "lucide-react"
import Loading from "@/components/Loading"
import Movie_Review from "@/components/Movie_Review";

export default function Movie_details() {
    const { id } = useParams()
    const { data: movie, isLoading, isError } = UseMovieDetails(id)
    const { data: trailer, refetch } = UseMovieTrailer(movie?.id, {
        enabled: false,
    })
    const showTrailer = async (movie) => {
        try {
            const trailerData = trailer || (await refetch()).data

            if (!trailerData?.url) {
                window.open(
                    `https://www.youtube.com/results?search_query=${movie.title}+movie+trailer`,
                    "_blank"
                )
                return
            }

            window.open(trailerData.url, "_blank")
        } catch (error) {
            alert("Failed to fetch trailer")
        }
    }


    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError || !movie) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <p className="text-xl font-semibold">Movie details could not be loaded.</p>
            </div>
        )
    }

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value)

    return (
        <div className="relative min-h-screen text-white overflow-hidden">

            {/* 🎬 BACKGROUND */}
            <div className="absolute inset-0 -z-10 ">
                {/* Image */}
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="h-full w-full object-cover"
                    alt="Backdrop"
                />

                {/* 🔥 Overlay (Gradient + Blur) */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/0 " />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl  px-10 pt-32 pb-20">

                <div className="grid lg:grid-cols-3 gap-10 items-start">

                    {/* Poster */}
                    <div className="flex justify-center">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="rounded-2xl shadow-2xl w-70 hover:scale-105 transition duration-500"
                            alt={movie.title}
                        />
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Title */}
                        <div>
                            <h1 className="text-5xl md:text-4xl font-extrabold leading-tight">
                                {movie.title}
                            </h1>

                            {movie.tagline && (
                                <p className="text-slate-300 italic mt-2 text-lg">
                                    {movie.tagline}
                                </p>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {movie.genres?.map((g) => (
                                <Badge
                                    key={g.id}
                                    className="bg-white/10 border-white/20 backdrop-blur-md text-white"
                                >
                                    {g.name}
                                </Badge>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 flex-wrap">
                            {movie.homepage && (
                                <Button
                                    className="rounded-full px-6 bg-white text-black font-semibold hover:bg-gray-200"
                                    onClick={() => window.open(movie.homepage, "_blank")}
                                >
                                    <Play className="mr-2 h-4 w-4" />
                                    Watch Now
                                </Button>
                            )}

                            <Button
                                onClick={() => showTrailer(movie)}
                                variant="outline"
                                className="rounded-full px-6 bg-white text-black font-semibold hover:bg-gray-200"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Trailer
                            </Button>
                        </div>

                        {/* Overview */}
                        <p className="text-slate-300 max-w-3xl leading-relaxed text-lg">
                            {movie.overview}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                            <Stat
                                label="Rating"
                                value={movie.vote_average?.toFixed(1)}
                                icon={<Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />}
                            />
                            <Stat
                                label="Runtime"
                                value={`${movie.runtime}m`}
                                icon={<Clock className="w-4 h-4 text-slate-300" />}
                            />
                            <Stat
                                label="Budget"
                                value={movie.budget ? formatCurrency(movie.budget) : "N/A"}
                                icon={<DollarSign className="w-4 h-4 text-green-400" />}
                            />
                            <Stat
                                label="Language"
                                value={movie.original_language?.toUpperCase()}
                                icon={<Globe className="w-4 h-4 text-blue-400" />}
                            />
                        </div>

                        {/* Production */}
                        <div className="pt-6 text-sm text-slate-400">
                            <span className="uppercase text-xs tracking-widest">
                                Production:
                            </span>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {movie.production_companies?.map((c) => (
                                    <span key={c.id} className="hover:text-white transition">
                                        {c.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                <Movie_Review />
            </div>
        </div>
    )
}

function Stat({ label, value, icon }) {
    return (
        <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
                {label}
            </p>
            <div className="flex items-center gap-2 text-lg font-bold">
                {icon}
                {value}
            </div>
        </div>
    )
}