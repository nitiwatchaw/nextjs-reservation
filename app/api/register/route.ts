import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { toast } from 'react-hot-toast'

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password, imageProfile } = body
    const hashedPassword = await bcrypt.hash(password, 12)


    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { name },
            ],
        },
    });

    if (existingUser) {
        // Return an error response if user or email already exists
        toast.error('user name/email is already used')
        return NextResponse.json({
            error: 'User with the same email or name already exists.',
        }, { status: 400 });
    }

    const user = await prisma.user.create({
        data: {
            email, name, hashedPassword, imageProfile
        }
    })



    return NextResponse.json(user)
}