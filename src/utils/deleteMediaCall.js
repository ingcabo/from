import axios from "axios";
import { MEDIA_URL } from "./constants";

// make axios call to save set
export function deleteMediaCall(name, items) {
  return axios.post(`${MEDIA_URL}delete`, {
    name
  });
}
