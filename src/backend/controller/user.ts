import { Md5 } from "md5-typescript";
import { countAllUser, create, getAllUser, updateUserById } from "../query/user"

export const createUser = async (payload: any) => {
    const {name, email, password} = payload;
    const document = {
        name: name,
        email: email,
        password: Md5.init(password),
    }
    const result = await create(document);
    return result;
}

export const findAllUser = async (query: any) => {
    const {page, limit} = query;
    const findMany = await getAllUser(page, limit);
    const count = await countAllUser();
    return {
       users: findMany,
       meta: {
        page: page,
        totalData: count,
        totalDataOnPage: findMany.length,
        totalPage: Math.ceil(count/limit)
       }
    }
}

export const updateUser = async (payload: any, id: number) => {
    let {name, email, password} = payload;
    if(password) {
        password = Md5.init(password);
    }
    const document = {
        name,
        email,
        password
    }
    const result = await updateUserById(document, id);
    return result;
}