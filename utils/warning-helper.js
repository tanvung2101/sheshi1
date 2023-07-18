import { toast } from "react-toastify"


function warningHelper(message) {
    if (message) {
        toast.error(message)
    }
}

export default warningHelper