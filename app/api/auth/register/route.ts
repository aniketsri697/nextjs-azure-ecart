import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        users: [
            { id: 1, name: 'Aniket' },
            { id: 2, name: "Joohn"}
        ]
    })
}

export async function POST(req: Request) {
    const body = await req.json();

    const {fullName, email, password, confirmPassword, gender} = body;

    if (!fullName || !email || !password || !confirmPassword || !gender) {
        return NextResponse.json(
            { error : "Missing fields or not provided the value "},
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: true,
        user: { email }
    })
}