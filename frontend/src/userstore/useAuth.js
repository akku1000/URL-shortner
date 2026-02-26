import {create } from 'zustand'
import axios from 'axios';
// https://url-shortner-backend-0mpj.onrender.com
// http://localhost:5000/api/users/register
const useAuth = create((set) => ({
    user:null,
    urls:null,
    newurl:null,

    signup:async(form)=>{
     try {
        const res=await axios.post("https://url-shortner-backend-0mpj.onrender.com/api/users/register",form);
        set({user:res.data.user});
        return res.data.message
     } catch (error) {
        return error.message;
     }
    },
    login:async(form)=>{
         try {
            const res=await axios.post("https://url-shortner-backend-0mpj.onrender.com/api/users/login",form);
            set({user:res.data.user});
            return res.data.message 
         } catch (error) {
            return error.message;
         }
    },
    shorten:async(url)=>{
       try {
            const res=await axios.post("https://url-shortner-backend-0mpj.onrender.com/api/url/shorten",{longUrl:url},{withCredentials:true});
            console.log(res.data.shortUrl);
            set({newurl:res.data.shortUrl})
            return res.data.shortUrl
       } catch (error) {
         return error.message;
       }
    },
    getall:async()=>{
          try {
            const res=await axios.get("https://url-shortner-backend-0mpj.onrender.com/api/url/geturl",{withCredentials:true});
            set({urls:res.data.urls})
          } catch (error) {
            return error.message;
          }
    }
}))

export default useAuth;