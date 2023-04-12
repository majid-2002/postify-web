import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { html } from "@codemirror/lang-html";
import { Col, Row } from "react-bootstrap";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";

export default function ResponseArea({ responseData }) {
  const contentType = responseData.lang_type;

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
            value={responseData.data}
            readOnly={true}
            placeholder={"Your response goes here."}
            theme={dracula}
            height="40vh"
            extensions={
              contentType === "json"
                ? [json()]
                : contentType === "javascript"
                ? [javascript()]
                : contentType === "html"
                ? [html()]
                : contentType === "xml"
                ? [xml()]
                : []
            }
          />
      </Row>
    </div>
  );
}
