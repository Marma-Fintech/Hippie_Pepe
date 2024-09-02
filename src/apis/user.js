import axios from "axios";
import { Base_Url } from "./baseurl";

export const UserDeatils = async (data) => {
  try {
    const response = await axios.post(`${Base_Url.base_url}/login`, data);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};
export const addWatchSeconds = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/userWatchRewards`,
      data
    );
    return response.data;
  } catch (err) {}
};
export const userGameRewards = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/userGameRewards`,
      data
    );
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
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
};

export const myReferrel = async (data) => {
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/yourReferrals/${data}?page=${1}&limit=${5}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const purchaseBooster = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/purchaseBooster`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const weekRewards = async (data) => {
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/weekRewards/${data.telegramId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const stakeRewards = async (data) => {
  try {
    const response = await axios.post(
      `${Base_Url.base_url}/stakingRewards`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularUser = async (telegramId) => {
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/popularUser/${telegramId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserStreaks = async (telegramId) => {
  try {
    const response = await axios.get(
      `${Base_Url.base_url}/userStreaks/${telegramId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const calculateStreak = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(`${Base_Url.base_url}/streak`, data);
    return response.data;
  } catch (err) {}
};
export const calculateStreakOfStreak = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(`${Base_Url.base_url}/streakOfStreak`, {
      telegramId: data,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};
export const loginStreakRewardClaim = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      `${Base_Url.base_url}/loginStreakRewardClaim`,
      data
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};
export const watchStreakRewardClaim = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      `${Base_Url.base_url}/watchStreakRewardClaim`,
      data
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};
export const referStreakRewardClaim = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      `${Base_Url.base_url}/referStreakRewardClaim`,
      data
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};
export const taskStreakRewardClaim = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      `${Base_Url.base_url}/taskStreakRewardClaim`,
      data
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};
export const multiStreakRewardClaim = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      `${Base_Url.base_url}/multiStreakRewardClaim`,
      data
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};
export const streakOfStreakRewardClaim = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      `${Base_Url.base_url}/streakOfStreakRewardClaim`,
      data
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Extract the backend-defined error message
      return err.response.data;
    } else {
      return err;
    }
  }
};

export default {
  UserDeatils,
  addWatchSeconds,
  userGameRewards,
  getUserDetails,
  purchaseGameCards,
  myReferrel,
  purchaseBooster,
  weekRewards,
  getPopularUser,
  getUserStreaks,
  calculateStreak,
  calculateStreakOfStreak,
  loginStreakRewardClaim,
  watchStreakRewardClaim,
  referStreakRewardClaim,
  taskStreakRewardClaim,
  multiStreakRewardClaim,
  streakOfStreakRewardClaim,
};
