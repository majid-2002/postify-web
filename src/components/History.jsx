import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

function HistoryCard({ method, url, datetime }) {
  const shortenedUrl = url.length > 36 ? url.substr(0, 36) + "..." : url;

  const methodClassName = `fs-5 ${method.toLowerCase()}-method`;

  return (
    <div className="history-card rounded-2">
      <Row>
        <Col className="d-flex align-items-center">
          <h3 className={methodClassName}>{method}</h3>
        </Col>
        <Col className="pt-2">
          <p>{shortenedUrl}</p>
          <p>
            <span>{datetime}</span>
          </p>
        </Col>
      </Row>
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
