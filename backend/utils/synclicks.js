import Url from '../models/url.model.js'
import { redis } from './rediss.js';

export const Clicks=async()=>{
     try {
        const keys = await redis.keys('clicks:*');
        if (!keys || keys.length === 0) {
            return; // Nothing to sync
        }
        for(const key of keys){
           const shortCode = key.split(':')[1];
           const count = await redis.getdel(key);

           if (count && parseInt(count) > 0) {
                await Url.updateOne(
                    { shorturl: shortCode },
                    { $inc: { clicks: parseInt(count) } }
                );
            }
        }
     } catch (error) {
        console.error('Error syncing clicks:', error.message);
     }
}