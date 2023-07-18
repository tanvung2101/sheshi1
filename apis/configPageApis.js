// import axiosClient from './axiosClient'

import axios from "axios";

const configPageApis = {
  getListConfigPageContact: () => axios.get("http://0.0.0.0:3001/api/config-page/contact"),
  getListConfigPageContent: (params) =>
    axios.get("http://0.0.0.0:3001/api/config-page/content-page", { params }),
  getListConfigPageSlide: (params) =>
    axios.get("http://0.0.0.0:3001/api/config-page/slide-page", { params }),
  updateConfigPageContact: (payload) =>
    axios.put("http://0.0.0.0:3001/api/config-page/update-page-contact", payload),
  updateConfigPageContentSlide: (payload) =>
    axios.put("http://0.0.0.0:3001/api/config-page/update-page-content-slide", payload),
};

export default configPageApis
