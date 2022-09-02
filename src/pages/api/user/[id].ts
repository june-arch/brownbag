import { createUser, findAllUser, updateUser } from '@/backend/controller/user';
import { deleteUserById, getUserById } from '@/backend/query/user';
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect';

export type Data = {
  message: string;
  code: number;
  timestamp: Date;
  data: any
}

const handler =nextConnect<NextApiRequest, NextApiResponse<Data>>();
handler
.get(async (req, res) => {
    const i = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    const id = Number(i)
    const find = await getUserById(id);
    if(!find){
        return res.status(500).json({
            message: 'id not found',
            code: 404,
            timestamp: new Date(),
            data: null
        })
    }
    return res.status(200).json({
        message: 'success',
        code: 200,
        timestamp: new Date(),
        data: find
    })
})
.patch(async (req, res) => {
    const i = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    const id = Number(i)
    const find = await getUserById(id);
    if(!find){
        return res.status(500).json({
            message: 'id not found',
            code: 404,
            timestamp: new Date(),
            data: null
        })
    }
    const result = await updateUser(req.body, id);
    if(!result){
        return res.status(500).json({
            message: 'internal server error',
            code: 500,
            timestamp: new Date(),
            data: null
        })
    }
    return res.status(200).json({
        message: 'success',
        code: 200,
        timestamp: new Date(),
        data: result
    })
})
.delete(async (req, res) => {
    const i = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
    const id = Number(i)
    const find = await getUserById(id);
    if(!find){
        return res.status(500).json({
            message: 'id not found',
            code: 404,
            timestamp: new Date(),
            data: null
        })
    }
    const result = await deleteUserById(id);
    if(!result){
        return res.status(500).json({
            message: 'internal server error',
            code: 500,
            timestamp: new Date(),
            data: null
        })
    }
    return res.status(200).json({
        message: 'success',
        code: 200,
        timestamp: new Date(),
        data: result
    })
})

export default handler