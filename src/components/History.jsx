import React, { useEffect, useState } from "react";

function HistoryCard({ method, url, datetime }) {

  

  const shortenedUrl = url.length > 30 ? url.substr(0, 30) + "..." : url;
  const methodClassName = `fs-5 ${method.toLowerCase()}-method`;




  return (
    <div className="history-card rounded-2" onClick={() => console.log("clicked")}>
      <div className="row-cols-2 d-flex align-items-center">
        <div style={{width : "70px"}} className="text-center">
          <h3 className={methodClassName}>{method}</h3>
        </div>
        <div className="p-2" style={{width : "250px"}}>
          <p>{shortenedUrl}</p>
          <p>
            <span>{datetime}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function History({ localStorageEndpoints }) {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    const updatedEndpoints = localStorageEndpoints.map((endpoint) => {
      const dateAndTime = endpoint.dateAndTime;
      const date = new Date(dateAndTime);
      const formattedDate = `${date.getHours()}:${(
        "0" + date.getMinutes()
      ).slice(-2)} ${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      return {
        ...endpoint,
        formattedDate,
      };
    });
    setEndpoints(updatedEndpoints);
  }, [localStorageEndpoints]);

  return (
    <div className="history">
      <div className="history-text-area">
        <h2>History</h2>
      </div>
      <div className="history-card-area">
        {endpoints.map((endpoint) => (
          <HistoryCard
            key={endpoint.url + endpoint.method + endpoint.timestamp}
            method={endpoint.method}
            url={endpoint.url}
            datetime={endpoint.formattedDate}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
