import { data as config } from '../config/data';
import { createHandyClient } from 'handy-redis';


const connectToDB = () => {
    return new Promise((resolve, reject) => {
        const client =  createHandyClient(config.dbOptions);
        try {
            return resolve(client)
        } catch (e) {
            return reject(e)
        }
    });


}

export { connectToDB }