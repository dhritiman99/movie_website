"use client"
import { useParams } from "next/navigation"
import { useMovieReview, useSubmitMovieReview } from "@/hooks/reviews"
import Loading from "./Loading"
import { Rating } from "react-simple-star-rating"
import { useState } from "react"
import axios from "axios"

export default function Movie_Review() {
    const { id } = useParams()
    const [expanded, setExpanded] = useState(false)
    const { data: reviews, isPending } = useMovieReview(id)
    const [invalidReview, setInvalidReview] = useState(false)
    const [review, setReview] = useState({
        username : "",
        movieID : id,
        rating : 1,
        desc : ""
    })

    const handleRating = (value) =>{
        setReview(p => ({...p, rating:value}))
    }
    const submit_review = async(e) => {
        e.preventDefault()
        if(review.username.trim().length>3 && review.desc.trim().length>5){
            const res = await axios.post(`/api/reviews`,{...review})
        }else{
            setInvalidReview(true)
            setTimeout(() => {
                setInvalidReview(false)
            },1500) 
        }
    }
    if (isPending) {
        return <Loading />
    };
    return (
        <div className="flex flex-col mt-4">
            <h2 className="text-center">REVIEWS</h2>
            <div className="grid grid-cols-2 gap-4  mt-4">

                <div className="flex flex-col gap-4 mt-4 bg-foreground/50 p-4 rounded-md">
                    <h2>Rate this Movie</h2>
                    <Rating
                        allowFraction
                        className="flex"
                        initialValue={review.rating}
                        size={50}
                        onClick={handleRating}
                    />
                    {
                        (review.rating != 0) && <form 
                            className="grid grid-cols-1 gap-4 justify-center items-center"
                        >
                            <label htmlFor="">Name</label>
                            <input type="text" onChange={e => setReview(p => ({...p,username:e.target.value}))} className="border border-accent"/>
                            <label>Your Thoughts</label>
                            <textarea  className="border border-accent h-48" onChange={e => setReview(p => ({...p,desc:e.target.value}))}/>
                            <button
                                onClick={(e) => submit_review(e)} 
                                type="submit"
                                className="bg-accent mx-auto py-2 px-6 mt-4 rounded-md hover:bg-background hover:text-foreground"
                                >
                                Submit
                            </button>
                            {
                                invalidReview && <div className="">Review cannot be empty !</div>
                            }
                        </form>
                    }
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 bg-foreground/50 p-4">
                    <p className="mx-auto">What viewers say</p>
                    {
                        reviews?.data.length === 0 && <div className="flex flex-col">
                            <p className="mx-auto">Be the first to Rate this movie</p>
                        </div>
                    }
                    {reviews?.data.map(
                        (r) => (
                            <div
                                key={r._id}
                                className={expanded? `grid grid-rows-3 p-3 border border-accent rounded-2xl`:
                                    `max-h-30 grid grid-rows-3 p-3 border border-accent rounded-2xl`
                                }
                            >
                                <p>{r.username}</p>
                                <Rating
                                    readonly
                                    className="flex"
                                    initialValue={r.rating || 0}
                                    size={24}
                                />
                                <p>{r.desc}</p>
                                {expanded? <button className="text-sm text-end" onClick={() => setExpanded(false)}>show less</button>:
                                    <button className="text-sm text-end" onClick={() => setExpanded(true)}>show more</button>
                                }
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}