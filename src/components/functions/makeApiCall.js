import axios from "axios";

export const makeApiCall = async (endpoint) => {
  const config = {
    method: endpoint.method,
    url: endpoint.url,
    headers: {
      ...endpoint.headers,
      "Content-Type": endpoint.contentType,
    },
    params: { ...endpoint.params },
    data: endpoint.body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};
