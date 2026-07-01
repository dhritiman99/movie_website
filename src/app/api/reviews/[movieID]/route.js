import clientPromise from "@/lib/db"
import { db_name } from "@/lib/db"

export async function GET(request, {params}){
    const {movieID} = await params
    const client = await clientPromise
    const db = client.db(db_name)
    const data = await db.collection("reviews").find({"movieid":parseInt(movieID)}).toArray()
    return Response.json({
        "data": data
    })
}

