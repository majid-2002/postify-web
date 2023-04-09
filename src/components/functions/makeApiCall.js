import axios from "axios";


export const makeApiCall = async (endpoint, method, headers, params, body) => {
    const config = {
      method,
      url: endpoint,
      headers: { ...headers },
      params: { ...params },
      data: body,
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  