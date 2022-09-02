import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()
prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == 'users') {
        if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
            params.action = 'update'
            params.args['data'] = { is_deleted: 1, deleted_at: new Date() }
        }
        if (params.action == 'deleteMany') {
        // Delete many queries
            params.action = 'updateMany'
            params.args['data'] = { is_deleted: 1, deleted_at: new Date() }
        }
        if(params.action === 'findMany' || params.action == 'count' || params.action === 'findFirst'){
            params.args['where'] = {
                AND: [
                    {...params.args['where']},
                    {is_deleted: 0}
                ]
            }
        }
    }
    return next(params)
})
export default prisma