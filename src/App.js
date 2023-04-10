import React from "react";
import HeaderArea from "./components/HeaderArea";
import RequestArea from "./components/RequestArea";
import ResponseArea from "./components/ResponseArea";
import History from "./components/History";
import RequestInputArea from "./components/RequestInputArea";
import { makeApiCall } from "./components/functions/makeApiCall";

function App() {

  const [endpoint, setEndpoint] = React.useState({
    "url": "",
    "method": "GET",
    "headers": {},
    "params": {},
    "body": ""
  });

  return (
    <div className="main">
      <HeaderArea />
      <RequestArea 
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        makeApiCall={makeApiCall}
      />
      <History />
      <RequestInputArea 
        endpoint={endpoint}
        setEndpoint={setEndpoint}
      />
      <ResponseArea />
    </div>
  );
}

export default App;
