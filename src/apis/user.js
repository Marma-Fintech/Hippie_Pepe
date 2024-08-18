import axios from "axios";
import { Base_Url } from "./baseurl";
// console.log(Base_Url.base_url);

export const UserDeatils = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(`${Base_Url.base_url}/login`, data);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
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
export const userGameRewards = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/userGameRewards`,
      data
    );
    console.log(response.data);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};
export const getUserDetails = async (telegramId) => {
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/userDetails}/${telegramId}`
    );
    console.log(response.data);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};
export const purchaseGameCards = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/purchaseGameCards`,
      data
    );
    console.log(response.data);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};
export default {
  UserDeatils,
  addWatchSeconds,
  userGameRewards,
  getUserDetails,
  purchaseGameCards,
};
