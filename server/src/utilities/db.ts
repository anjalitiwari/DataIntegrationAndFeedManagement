const insert = (params: any, dbClient: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await dbClient.set(params.key, params.data)
            return resolve(result)
        }
        catch (error) {
            return reject(error);
        }

    });
};
const get = (params: any, dbClient: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await dbClient.get(params)
            return resolve(result);
        }
        catch (error) {
            return reject(error);
        }

    });
};

const getKeys = (params: string, dbClient: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await dbClient.keys(params)
            return resolve(result)
        }
        catch (error) {
            return reject(error);
        }

    });
};
const zadd = (zaddArgs:string[], dbClient: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await dbClient.zadd(zaddArgs)
            return resolve(result)
        }
        catch (error) {
            return reject(error);
        }

    });
};
const zrevrangeByScore = (zrevrangeByScoreArgs:(string|number)[], dbClient: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result:any[] = await dbClient.zrevrangebyscore(zrevrangeByScoreArgs)
            return resolve(result)
        }
        catch (error) {
            return reject(error);
        }

    });
};

export { insert, get, getKeys, zadd, zrevrangeByScore }