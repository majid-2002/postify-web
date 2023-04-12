import React, { useState } from "react";
import HeaderArea from "./components/HeaderArea";
import RequestArea from "./components/RequestArea";
import ResponseArea from "./components/ResponseArea";
import History from "./components/History";
import RequestInputArea from "./components/RequestInputArea";
import { makeApiCall } from "./components/functions/makeApiCall";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

function App() {
  const [responseData, setResponseData] = useState({
    data: "",
    lang_type: "",
  });

  const handleSubmitRequest = async () => {
    const response = await makeApiCall(endpoint);
    const contentType = response.headers["content-type"];
    console.log(contentType);
    let stringValue;

    if (contentType.includes("json")) {
      stringValue = JSON.stringify(response.data, null, 2);
      setResponseData({
        ...responseData,
        data : stringValue,
        lang_type: "json",
      });
    } else if (contentType.includes("html")) {
      stringValue = prettier.format(response.data, {
        parser: "html",
        plugins: [parserHtml],
      });
      setResponseData({
        ...responseData,
        data : stringValue,
        lang_type: "html",
      });
    } else if (contentType.includes("xml")) {
      stringValue = prettier.format(response.data, { parser: "xml" });
      setResponseData({
        ...responseData,
        data : stringValue,
        lang_type: "xml",
      });
    } else if (contentType.includes("javascript")) {
      stringValue = prettier.format(response.data, { parser: "babel" });
      setResponseData({
        ...responseData,
        data : stringValue,
        lang_type: "javascript",
      });
    } else {
      stringValue = prettier.format(response.data, { parser: "text" });
      setResponseData({
        ...responseData,
        data : stringValue,
        lang_type: "text",
      });
    }

    
  };





  const [endpoint, setEndpoint] = React.useState({
    url: "",
    method: "GET",
    headers: "",
    params: "",
    body: {},
    contentType: "",
  });

  return (
    <div className="main">
      <HeaderArea />
      <RequestArea
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        handleSubmit={handleSubmitRequest}
      />
      <History />
      <RequestInputArea endpoint={endpoint} setEndpoint={setEndpoint} />
      <ResponseArea responseData={responseData} />
    </div>
  );
}

export default App;
