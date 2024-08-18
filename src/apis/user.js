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

export const myReferrel = async (data) => {
  console.log(JSON.stringify(data) + ";oljl;h;h;h");
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/yourReferrals?page=${1}&limit=${5}`,
      data
    );

    return response.data.user;
  } catch (err) {}
};

export default {
  UserDeatils,
  addWatchSeconds,
};
