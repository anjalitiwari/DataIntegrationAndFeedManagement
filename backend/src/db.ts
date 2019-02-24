import { data as config } from '../config/data';
import { RedisClient } from "redis";


const connectToDB = () => {
    return new Promise((resolve, reject) => {
        const client = new RedisClient(config.dbOptions);
        try {
            client.on('connect', () => {
                console.log("Connected to Redis");
                return resolve(client)
            });
        } catch (e) {
            return reject(e)
        }
    });


}

export { connectToDB }