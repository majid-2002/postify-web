import React from "react";
import { Row, Col } from "react-bootstrap";

function HistoryCard() {
  return (
    <div className="history-card rounded-2">
      <Row>
        <Col>
          <h3>GET</h3>
        </Col>
        <Col>
          <p>https://google.com/favicon.ico</p>
          <p>
            <span>21:15</span>
            <span>21 March 2023</span>
          </p>
        </Col>
      </Row>
    </div>
  );
}

function History() {
  return (
    <div className="history">
      <div className="history-text-area">
        <h2>History</h2>
      </div>
      <div className="history-card-area">
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </div>
    </div>
  );
}

export default History;
