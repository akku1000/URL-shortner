import Url from '../models/url.model.js';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { redis } from '../utils/rediss.js';
import { encodeBase62 } from '../utils/base63.2.js';
dotenv.config();

const shortenUrl=async(req,res)=>{
    try {
        const {longUrl}=req.body;
        if(!longUrl){
            return res.status(400).json({message:"Please enter a url"});
        }

        const cachedCode = await redis.get(`long:${longUrl}`);
        if(cachedCode){
            return res.json({shortUrl:`${process.env.BASE_URL}/${cachedCode}`});
        }
        // making short url
    
        const globalId = await redis.incr("global_url_id");
        const shortcode = encodeBase62(globalId);
        
        await Url.create({
            longurl:longUrl,
            shorturl:shortcode,
            user:req.user._id,
            expiresAt: new Date(Date.now() + 2*24*60*60*1000) // 2 days
        });
        const expiry = 172800; 
        await redis.set(`url:${shortcode}`, longUrl, { ex: expiry });
        await redis.set(`long:${longUrl}`, shortcode, { ex: expiry });
        res.status(200).json({
            message:"Url shortened successfully",
            shortUrl:`${process.env.BASE_URL}/${shortcode}`
        });
    } catch (error) {
        return res.status(500).json({message:error.message||"Internal server error"});
    }
}

const reDirectUrl=async(req,res)=>{
     try {
        const code=req.params.code;
        const cachedLongUrl = await redis.get(`url:${code}`);
        if(cachedLongUrl){
            redis.incr(`clicks:${code}`);
            return res.redirect(cachedLongUrl);
        }
        const url=await Url.findOne({shorturl:code});
        if(!url){
            return res.status(404).json({message:"Url expire or not found"});
        }
        await redis.set(`url:${code}`, urlEntry.longurl, { ex: 86400 });
        await redis.incr(`clicks:${code}`);
        res.redirect(url.longurl);
     } catch (error) {
        return res.status(500).json({message:error.message||"Internal server error"});
     }
}


const getAllUrls=async(req,res)=>{
    try {
        const userid=req.user._id;
        const urls=await Url.find({user:userid}).sort({createdAt:-1});
       if(!urls){
        return res.status(404).json({message:"No url found or url expires"});
       }
       res.status(200).json({urls});
    } catch (error) {
        return res.status(500).json({message:error.message||"Internal server error"});
    }
}

export {shortenUrl,getAllUrls,reDirectUrl};