// import axios from "axios";
import axiosClient from "./axiosClient";

const contractApis = {
  createContractData: (payload) =>
  axiosClient.post("/api/contract/new-contract", payload),
};

export default contractApis;




