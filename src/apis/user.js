import axios from "axios";
import { Base_Url } from "./baseurl";

export const UserDeatils = async (data) => {
  try {
    const response = await axios.post(`${Base_Url.base_url}/login`, data);

    return response.data.user;
  } catch (err) {}
};

export const addWatchSeconds = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/userWatchRewards`,
      data
    );

    return response.data.user;
  } catch (err) {}
};

export default {
  UserDeatils,
  addWatchSeconds,
};
