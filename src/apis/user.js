import axios from "axios";
import { Base_Url } from "./baseurl";
// console.log(Base_Url.base_url);

export const UserDeatils = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(`${Base_Url.base_url}/login`, data);

    return response.data.user;
  } catch (err) {}
};

export const addWatchSeconds = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
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
