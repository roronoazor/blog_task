import { NextResponse } from "next/server";
import axios from "axios";
import type { NextRequest,  } from 'next/server';
import { createPost, getPosts } from "../../../firebase/firestore";



export async function POST(request: NextRequest) {
  
    const { title, content } = await request.json();

    const post = await createPost(title, content);
    
    return NextResponse.json({ message: 'success', post }, { status: 201 });
  
}

export async function GET(request: NextRequest) {
  try {
    
    const page = request.nextUrl.searchParams.get("page") || "1";
    const title = request.nextUrl.searchParams.get("title") || "";
    // Make a GET request to fetch data with pagination
    const { posts, totalPages } = await getPosts(10, title, page);
    
    return NextResponse.json({
      posts,
      status: "success", 
      page,
      totalPages
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
