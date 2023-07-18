import axios from "axios";
import queryString from "query-string";
import Configs from '@/configs'

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
  // paramsSerializer: params => queryString.stringify(params)
});

// const axiosClient = axios.create({
//   baseURL: `http://localhost:3001`,
//   headers: {
//     'content-type': 'application/json'
//   },
//   paramsSerializer: params => queryString.stringify(params)
// })

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// },
//   (error) => {
//     Promise.reject(error);
//   }
//   // Handle token here ...
// )

axiosClient.interceptors.request.use((config) =>
  // Handle token here ...
  config
)

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data
  }
  return response
}, (error) => {
  // Handle errors
  throw error
})


export default axiosClient;
