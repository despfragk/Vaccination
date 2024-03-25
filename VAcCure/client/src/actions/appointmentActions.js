import axios from "axios";
import { GET_ERRORS } from "./types";
import { GET_VACCINATION_RECORDS } from "./types";
import setAuthToken from "../utils/setAuthToken";


// newApoointmet
export const newAppointment = (vaccinationData, history) => dispatch => {
  axios
    .post("/api/vaccinations/appointments", vaccinationData, { headers: { Authorization:localStorage.getItem('jwtToken') } })
    .then(res => history.push("/dashboard")).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAppointmentByamka = async (reqData) => {

   let res = await axios({
    method: 'get',
    url: '/api/vaccinations/dashboard',
    params: reqData,
    validateStatus: (status) => {
      return true; 
    },
  }).catch(error => {
      console.log(error);
  }).then(response => {
    return response.data.records
  })

  console.log(res);
  return res;

};


export const editVaccination = async (reqData) => {
  
  axios
  .put("/api/vaccinations/dashboard", reqData, )
  .then(res => {return {message: res}})
  .catch(err =>{return {message: err}});

};


export const editVaccination1 = async (reqData) => {

  let res = await axios({
    method: 'put',
    url: '/api/vaccinations/dashboard',
    params: reqData,
    validateStatus: (status) => {
      return true; 
    },
 }).catch(error => {
     console.log(error);
 }).then(response => {
   return {message: response}
 })
}

//  console.log(res);
//  return res;

// };

// export const setAppointment = data => {
//   return { 
//     type: GET_VACCINATION_RECORDS,
//     payload: data 
//   };
// };

// export const sendToken= ()=>{
// axios.post('/api/vaccinations/appointments',{ headers: { Authorization:localStorage.getItem('jwtToken') } })
//             .then(response=> console.log(response))
//             .catch(error => console.log(error));
// }
