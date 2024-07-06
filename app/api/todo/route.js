import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
    const client = await clientPromise;
    const collection = client.db().collection("todonext1900");
    try {
        const todos = await collection.find({}).toArray()
        return NextResponse.json(todos, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}
export async function POST(req) {
    const client = await clientPromise;
    const collection = client.db().collection("todonext1900");
    const { text } = await req.json()
    try {
        const todo = {
            text: text,
            check: false
        }
        await collection.insertOne(todo)
        return NextResponse.json(todo, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }

}

export async function DELETE(req) {
    const { id } = await req.json()
    const client = await clientPromise
    const collection = client.db().collection("todonext1900")
    try {
        await collection.deleteOne({ _id: new ObjectId(id) })
        return NextResponse.json("Todo deleted", { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

export async function PUT(req) {
    const { text, id, check } = await req.json()
    const client = await clientPromise
    const collection = client.db().collection("todonext1900")
    try {
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { text, check } },
        )
        return NextResponse.json("Todo updated", { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}