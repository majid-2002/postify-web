import axios from "axios";

export const makeApiCalltest = async () => {
  const config = {
    method: "GET",
    url: "https://reqres.in/api/users/2",
    headers: {
      "Content-Type": "application/json",
    },
    params: {},
    data: {},
  };

  try {
    const response = await axios(config);
    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};
