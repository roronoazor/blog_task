import { NextResponse } from "next/server";
import type { NextRequest,  } from 'next/server';
import { updatePost, getPostDetail, deletePost } from "../../../../firebase/firestore";



export async function PUT(request: NextRequest,  params: { params: { id: string } }) {
    try {
        const id: string = params.params.id;
        const { title, content } = await request.json();
        
        await updatePost(id, title, content);
        
        return NextResponse.json({
          status: "success", 
        }, { status: 200 });
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
}

export async function GET(request: NextRequest, params: { params: { id: string } }) {
  try {
    const id: string = params.params.id;
    const post = await getPostDetail(id);

    return NextResponse.json({
      post,
      status: "success", 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest,  params: { params: { id: string } }){
    try {
        const id: string = params.params.id;    
        await deletePost(id);

        return NextResponse.json({
          status: "success", 
        }, { status: 200 });
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
}
