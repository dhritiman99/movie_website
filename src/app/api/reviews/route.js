import clientPromise from "@/lib/db";
import { db_name } from "@/lib/db";

export async function GET(){
    const client = await clientPromise
    const db = client.db(db_name)
    const reviews = await db.collection("reviews").find({}).toArray()
    return Response.json({
        "data": reviews
    })
    
}

export async function POST(request){
    const body = await request.json()
    const client = await clientPromise
    const db = client.db(db_name)
    const res = await db.collection("reviews").insertOne({
        "username":body.username,
        "movieid":parseInt(body.movieID),
        "desc":body.desc,
        "rating":body.rating
    })
    
    return Response.json({
        "message": res
    })
}