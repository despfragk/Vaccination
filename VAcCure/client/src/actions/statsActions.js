import axios from "axios";
import { GET_ERRORS } from "./types";

export const getStats = async (reqData) => {

    let res = await axios({
     method: 'get',
     url: '/api/vaccinations/stats',
     validateStatus: (status) => {
       return true; 
     },
   }).catch(error => {
       //console.log(error);
   }).then(response => {
     return response.data
   })
 
   //console.log(res);
   return res;
 
};
 