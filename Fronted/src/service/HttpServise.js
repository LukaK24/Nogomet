import axios from "axios";
import { BACKEND_URL } from "../constants";

export const HttppService = axios.create({
baseURL: BACKEND_URL,
headers:{
    'Content-Type': 'application/json'
}

});