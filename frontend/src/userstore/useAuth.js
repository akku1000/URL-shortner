import {create } from 'zustand'
import axios from 'axios';
const useAuth = create((set) => ({
    user:null,
    newurl:null,

    signup:async(form)=>{
     try {
        const res=await axios.post("http://localhost:5000/api/users/register",form);
        set({user:res.data.user});
        return res.data.message
     } catch (error) {
        return error.message;
     }
    },
    login:async(form)=>{
         try {
            const res=await axios.post("http://localhost:5000/api/users/login",form);
            set({user:res.data.user});
            return res.data.message 
         } catch (error) {
            return error.message;
         }
    },
    shorten:async(url)=>{
       try {
            const res=await axios.post("http://localhost:5000/api/url/shorten",{longUrl:url},{withCredentials:true});
            console.log(res.data.shortUrl);
            set({newurl:res.data.shortUrl})
            return res.data.shortUrl
       } catch (error) {
         return error.message;
       }
    }
}))

export default useAuth;