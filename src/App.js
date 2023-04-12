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
    status : 200,
    size : null,
    time : null,
  });

  const [Loading , setLoading] = useState(false);


  const handleSubmitRequest = async () => {
    setLoading(true);
    const startTime = Date.now();
    const response = await makeApiCall(endpoint);
    const endTime = Date.now();
    setLoading(false);
  
    const contentType = response.headers["content-type"];
    const responseSize =(new TextEncoder().encode(JSON.stringify(response.data)).length / 1024).toFixed(2);

    let stringValue;
    if (contentType.includes("json")) {
      stringValue = JSON.stringify(response.data, null, 2);
    } else if (contentType.includes("html")) {
      stringValue = prettier.format(response.data, { parser: "html", plugins: [parserHtml] });
    } else if (contentType.includes("xml")) {
      stringValue = prettier.format(response.data, { parser: "xml" });
    } else if (contentType.includes("javascript")) {
      stringValue = prettier.format(response.data, { parser: "babel" });
    } else {
      stringValue = prettier.format(response.data, { parser: "text" });
    }
  
    setResponseData({
      data: stringValue,
      lang_type: contentType.split(";")[0].split("/")[1], //? "json" or "html" or "xml" or "javascript" or "plain"
      status: response.status,
      time: endTime - startTime, // time taken to receive response in milliseconds
      size: responseSize, // size of the response in bytes
    });
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
      <ResponseArea responseData={responseData} Loading={Loading}/>
    </div>
  );
}

export default App;
