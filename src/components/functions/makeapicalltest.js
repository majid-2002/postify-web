import axios from "axios";

export const MakeApiCallTest = async () => {

  const endpoint = {
    url: "https://reqres.in/api/users",
    method: "POST",
    headers: "",
    params: "",
    body: {
      name: "morpheus",
      job: "leader",
    },
    contentType: "application/json",
  }

  const config = {
    method: endpoint.method,
    url: endpoint.url,
    headers: {
      ...endpoint.headers,
      "Content-Type": endpoint.contentType,
    },
    params: { ...endpoint.params },
    data: {
      ...endpoint.body,
    },
  };

  try {
    const response = await axios(config);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
