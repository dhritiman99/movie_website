import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export const useMovieReview = (movie_id) => {
    return useQuery({
        queryKey: ['movie_review',movie_id],
        queryFn: async () => {
            var res = await axios.get(`/api/reviews/${movie_id}}`)
            return res.data
        }
    })
}
export const useSubmitMovieReview = (review) => {
    return useQuery({
        queryKey: ['submit_review'],
        queryFn: async () => {
            var res = await axios.post(`/api/reviews`,data={...review})
        }
    })
} 