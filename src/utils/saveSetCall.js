import axios from "axios";
import { MEIDASETS_ACTIONS_URL } from "./constants";

// make axios call to save set
export function saveSetCall(name, items) {
  return axios.post(`${MEIDASETS_ACTIONS_URL}update`, {
    name,
    items: items.map((item, i) => {
      const { width, height, name, original_name, type, ver } = item;
      return {
        name,
        ver,
        width,
        height,
        original_name,
        type,
        seq: i
      };
    })
  });
}
