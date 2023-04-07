import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Col, Row } from "react-bootstrap";

export default function ResponseArea() {
  return (
    <div className="response-area px-3">
      <Row className="result-container pt-2 w-25">
        <Col md={4}>
          <h4>Status</h4>
          <p>200</p>
        </Col>
        <Col md={4}>
          <h4>Status</h4>
          <p>200</p>
        </Col>
        <Col md={4}>
          <h4>Status</h4>
          <p>200</p>
        </Col>
      </Row>
      <Row>
        <CodeMirror
          value="Your response goes here."
          theme={dracula}
          height="40vh"
        />
      </Row>
    </div>
  );
}
