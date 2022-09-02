import { createUser, findAllUser, updateUser } from '@/backend/controller/user';
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
    const { page, limit } = req.query
    const dataPage = Array.isArray(page) ? page[0] : page
    const dataLimit = Array.isArray(limit) ? limit[0] : limit
    const valuePage = Number(dataPage) || 1
    const valueLimit = Number(dataLimit) || 10
    const result = await findAllUser({page: valuePage, limit: valueLimit});
    if(result.users.length == 0){
        return res.status(404).json({
            message: 'data not found',
            code: 404,
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
.post(async (req, res) => {
    const result = await createUser(req.body);
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