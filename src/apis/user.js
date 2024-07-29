import axios from "axios";

export const UserDeatils = async (data) => {
  try {
    console.log(data + "datadatadatadatadata");
    const response = await axios.post("http://localhost:9090/login", data);

    return response.data;
  } catch (err) {}
};

export default {
  UserDeatils,
};
