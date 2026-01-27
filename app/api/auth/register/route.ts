import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "../../lib/db";

export async function GET() {
    return NextResponse.json({
        users: [
            { id: 1, name: 'Aniket' },
            { id: 2, name: "Joohn"}
        ]
    })
}

export async function POST(req: Request) {
    try {
    const body = await req.json();
    const { fullName, gender, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await getDb();
    console.log("db:::::: ",db);
    await db
      .request()
      .input("fullName", fullName)
      .input("gender", gender)
      .input("email", email)
      .input("password", hashedPassword)
      .query(`
        INSERT INTO Users (fullName, gender, email, password)
        VALUES (@fullName, @gender, @email, @password)
      `);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}