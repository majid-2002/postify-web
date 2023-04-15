import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { Col, Row } from "react-bootstrap";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import { dracula } from "@uiw/codemirror-theme-dracula";

export default function ResponseArea({ responseData, Loading }) {
  const { data, lang_type: contentType, status, time, size } = responseData;

  const customStyle = {
    color:
      status >= 200 && status < 300
        ? "#31cd64"
        : status >= 300 && status < 400
        ? "#fda92a"
        : status >= 400 && status < 500
        ? "#fda92a"
        : "#fc4f52",
  };

  const statusLabel = { value: "Status", style: customStyle };
  const timeLabel = { value: "Time", style: { color: "#17a2b8" } };
  const sizeLabel = { value: "Size", style: { color: "#17a2b8" } };
  const labels = [statusLabel, timeLabel, sizeLabel];

  return (
    <div>
      {data === "" ? (
        <div className="response-area text-secondary text-center pt-5">
          <p>Send a request</p>
        </div>
      ) : (
        <div className="response-area px-3">
          {Loading ? (
            <div className="text-center pt-5">
              <Button
                style={{ backgroundColor: "#17a2b8" }}
                startDecorator={
                  <CircularProgress variant="soft" thickness={3} />
                }
              >
                Loading…
              </Button>
            </div>
          ) : (
            <>
              <Row className="result-container pt-2 w-25">
                {labels.map(({ value, style }, index) => (
                  <Col md={4} key={index}>
                    <h4 style={style}>{value}</h4>
                    <p style={style}>
                      {index === 0
                        ? status
                        : index === 1
                        ? `${time} ms`
                        : status >= 400 || status === "Error"
                        ? `${size} B`
                        : `${size} KB`}
                    </p>
                  </Col>
                ))}
              </Row>
              <Row>
                <CodeMirror
                  value={
                    contentType === "json" || typeof data === "object"
                      ? JSON.stringify(data, null, 2)
                      : data
                  }
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
