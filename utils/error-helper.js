import { STATUS_REQUEST } from "@/constants";

const { default: Config } = require("@/configs");

function errorHelper(err) {
    if (Config.ENV == 'local') {
    }

    const statusCode = err?.response?.status || 500;
    const messageError = err?.response?.data?.code || err?.message;

    // if(statusCode === STATUS_REQUEST.UNAUTHORIZED || err?.response?.data === 'Unauthorized' ){
    // store.dispatch(logout())
    // }

    if (statusCode === 500) {

    }
}

export default errorHelper