import React from "react";
import { Row, Col } from "react-bootstrap";

function HistoryCard() {

  return(
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
  )
}

function History() {
  return (
    <div className="history">
      <h3>History</h3>
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  );
}

export default History;
