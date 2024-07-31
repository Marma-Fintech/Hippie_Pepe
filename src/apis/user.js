import axios from "axios";

export const UserDeatils = async (data) => {
  try {
    // console.log(data + "datadatadatadatadata");
    const response = await axios.post(
      "https://memetv-backend.onrender.com/login",
      data
    );

    return response.data.user;
  } catch (err) {}
};

export default {
  UserDeatils,
};
