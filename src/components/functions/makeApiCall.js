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
    data:
      endpoint.contentType === "application/json"
        ? JSON.parse(endpoint.body)
        : endpoint.body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};
