import prisma from '@/backend/helper/db';

export const create = async (document: any) => {
    return await prisma.users.create({
        data: {
            ...document,
        }
    })
}

export const getUserById = async (id: number) => {
    return await prisma.users.findFirst({
        where: {
            id,
        }
    })
}

export const getAllUser = async (page: number, limit: number) => {
    return await prisma.users.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
            {
                created_at: 'desc',
            }
        ]
    })
}

export const countAllUser = async () => {
    return await prisma.users.count();
}

export const updateUserById = async (document: any, id: number) => {
    const result = await prisma.users.update({
        data: {
            ...document,
            updated_at: new Date
        },
        where: {
            id: Number(id)
        }
    });
    return result;
}

export const deleteUserById = async (id: number) => {
    const result = await prisma.users.update({
        data:{
            is_deleted: 1,
            deleted_at: new Date()
        },
        where: {
            id
        }
    })
    return result;
}