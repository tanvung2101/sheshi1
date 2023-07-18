import axios from "axios";
import axiosClient from "./axiosClient";
// import axiosClient from "./axiosClient";
const productsApis = {
  getAllProducts: (params) =>
    axios.get("http://0.0.0.0:3001/api/product", { params }),
  getProducts: (params) =>
    axios.get("http://0.0.0.0:3001/api/product/get-by-slug", { params }),
  getCapacityProducts: (params) =>
    axios.get("http://0.0.0.0:3001/api/product/get-capacity-product", {
      params,
    }),
  getAllProductsClient: (params) =>
    axiosClient.get("/api/product", { params }),
  getProductsClient: (params) =>
    axiosClient.get("/api/product/get-by-slug", { params }),
};

export default productsApis;
