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
  const status = responseData.status;
  const time = responseData.time;
  const size = responseData.size;
  
  
  let customStyle = {
    color: ""
  }

  if (status >= 200 && status < 300) {
    customStyle.color = "#39cc18";
  } else if (status >= 300 && status < 400) {
    customStyle.color = "#FD7E14";
  } else if (status >= 400 && status < 500) {
    customStyle.color = "#DC3545";
  } else if (status >= 500 && status < 600) {
    customStyle.color = "#343A40";
  }


  return (
    <div className="response-area px-3">
      <Row className="result-container pt-2 w-25">
        <Col md={4}>
          <h4 style={customStyle}>Status</h4>
          <p style={customStyle}>{status}</p>
        </Col>
        <Col md={4}>
          <h4 className="custom-color-blue">Time</h4>
          <p className="custom-color-blue">{time} ms</p>
        </Col>
        <Col md={4}>
          <h4 className="custom-color-blue">Size</h4>
          <p className="custom-color-blue">{size} KB</p>
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
