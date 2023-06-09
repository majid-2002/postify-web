import React, { useState, createContext } from "react";
import HeaderArea from "./components/HeaderArea";
import RequestArea from "./components/RequestArea";
import ResponseArea from "./components/ResponseArea";
import History from "./components/History";
import RequestInputArea from "./components/RequestInputArea";
import { makeApiCall } from "./components/functions/makeApiCall";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

export const UserContext = createContext();

function App() {
  const [parameter, setParameter] = useState([{ key: "", value: "" }]);
  const [header, setHeader] = useState([{ key: "", value: "" }]);

  const [endpoint, setEndpoint] = React.useState({
    url: "",
    method: "GET",
    headers: {},
    params: {},
    body: "",
    contentType: "",
  });

  const [responseData, setResponseData] = useState({
    data: "",
    lang_type: "",
    status: 200,
    size: null,
    time: null,
  });

  const [Loading, setLoading] = useState(false);

  const [localStorageEndpoints, setlocalStorageEndpoint] = useState(
    JSON.parse(localStorage.getItem("endpoints")) || []
  );

  const handleSubmitRequest = async () => {
    setLoading(true);
    let startTime = null;
    let endTime = null;
    let responseSize = "-";
    try {
      if (!/^https?:\/\//i.test(endpoint.url)) {
        endpoint.url = `http://${endpoint.url}`;
      }

      startTime = Date.now();
      const response = await makeApiCall(endpoint);
      endTime = Date.now();

      const contentType = response.headers["content-type"] || "unknown";

      let stringValue;
      if (contentType.includes("json")) {
        stringValue = response.data;
      } else if (contentType.includes("html")) {
        stringValue = prettier.format(response.data, {
          parser: "html",
          plugins: [parserHtml],
        });
      } else if (contentType.includes("xml")) {
        stringValue = prettier.format(response.data, { parser: "xml" });
      } else if (contentType.includes("javascript")) {
        stringValue = prettier.format(response.data, { parser: "babel" });
      } else {
        stringValue = response.data || response.statusText;
      }

      responseSize = (
        new TextEncoder().encode(JSON.stringify(response.data)).length / 1024
      ).toFixed(2);

      setResponseData({
        data: stringValue,
        lang_type: contentType.split(";")[0].split("/")[1], //? "json" or "html" or "xml" or "javascript" or "plain"
        status: response.status,
        time: endTime - startTime, // time taken to receive response in milliseconds
        size: responseSize, // size of the response in bytes
      });

      const exists = localStorageEndpoints.some((e) => {
        const urlWithoutProtocol = e.url.replace(/^https?:\/\//, "");
        const endpointUrlWithoutProtocol = endpoint.url.replace(
          /^https?:\/\//,
          ""
        );
        return (
          urlWithoutProtocol === endpointUrlWithoutProtocol &&
          e.method === endpoint.method &&
          e.body === endpoint.body &&
          e.contentType === endpoint.contentType &&
          JSON.stringify(e.headers) === JSON.stringify(endpoint.headers) &&
          JSON.stringify(e.params) === JSON.stringify(endpoint.params)
        );
      });

      if (exists === false) {
        const dateAndTime = new Date().toLocaleString("en-US", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        const newEndpoint = { ...endpoint, dateAndTime };
        setlocalStorageEndpoint([...localStorageEndpoints, newEndpoint]);
        localStorage.setItem(
          "endpoints",
          JSON.stringify([...localStorageEndpoints, newEndpoint])
        );
      }
    } catch (error) {
      let statusCode, errorType, errorMessage;

      if (error.response) {
        // Handle API errors
        statusCode = error.response.status;
        if (statusCode >= 400) {
          errorType = error.response.data?.error || "Unknown error";
        }
        errorMessage =
          error.response.data?.message ||
          error.response.statusText ||
          "An error occurred while processing the request.";
      } else if (error.request) {
        // Handle network errors
        statusCode = "Network Error";
        errorType = "Network error";
        errorMessage = "Unable to connect to the server.";
      } else {
        // Handle other errors
        statusCode = "Error";
        errorType = error.name || "Unknown error";
        errorMessage = error.message || "An error occurred.";
      }

      const errorEndpoint = {
        ...endpoint,
        response: error.response?.data || {
          statusCode,
          error: errorType,
          message: errorMessage,
        },
      };

      const exists = localStorageEndpoints.some((e) => {
        const urlWithoutProtocol = e.url.replace(/^https?:\/\//, "");
        const endpointUrlWithoutProtocol = endpoint.url.replace(
          /^https?:\/\//,
          ""
        );
        return (
          urlWithoutProtocol === endpointUrlWithoutProtocol &&
          e.method === endpoint.method &&
          e.body === endpoint.body &&
          e.contentType === endpoint.contentType &&
          JSON.stringify(e.headers) === JSON.stringify(endpoint.headers) &&
          JSON.stringify(e.params) === JSON.stringify(endpoint.params)
        );
      });

      if (exists === false) {
        const dateAndTime = new Date().toLocaleString("en-US", {
          hour12: false,
          hour: "numeric",
          minute: "numeric",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        const newEndpoint = { ...errorEndpoint, dateAndTime };
        setlocalStorageEndpoint([...localStorageEndpoints, newEndpoint]);
        localStorage.setItem(
          "endpoints",
          JSON.stringify([...localStorageEndpoints, newEndpoint])
        );
      }

      const errorResponseData = {
        statusCode,
        error: errorType,
        message: errorMessage,
      };

      responseSize = new TextEncoder().encode(
        JSON.stringify(errorResponseData)
      ).length;

      setResponseData({
        data: errorResponseData,
        lang_type: "json",
        status: error.response?.status || "Error",
        time: Date.now() - startTime,
        size: responseSize,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <UserContext.Provider
        value={{
          parameter,
          setParameter,
          header,
          setHeader,
          setEndpoint,
          endpoint,
        }}
      >
        <div className="left-area">
          <HeaderArea />
          <History localStorageEndpoints={localStorageEndpoints} />
        </div>
        <div className="right-area">
          <RequestArea
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            handleSubmit={handleSubmitRequest}
          />
          <RequestInputArea endpoint={endpoint} setEndpoint={setEndpoint} />
          <ResponseArea responseData={responseData} Loading={Loading} />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
