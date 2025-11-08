import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { prisma } from "@/db/postgres/prisma.client";
import { generateId } from "@/lib/snowflake";
import { signupSchema } from "@/features/auth/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(validatedData.password);

    const user = await prisma.user.create({
      data: {
        id: generateId(),
        email: validatedData.email,
        username: validatedData.username,
        name: validatedData.name ?? validatedData.username,
        password: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });

    return NextResponse.json(
      { 
        message: "User created successfully", 
        userId: user.id.toString() 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}