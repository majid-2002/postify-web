import React, { memo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { Col, Row } from "react-bootstrap";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { FileCopyOutlined } from "@mui/icons-material";
import FeatherIcon from "feather-icons-react";

function ResponseArea({ responseData, Loading }) {
  const { data, lang_type: contentType, status, time, size } = responseData;

  function Prettified() {
    return (
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
          height="32vh"
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
    );
  }

  function Raw() {
    return (
      <Row>
        <CodeMirror
          theme={dracula}
          value={
            contentType === "json" || typeof data === "object"
              ? JSON.stringify(data, null, 2)
              : data
          }
          readOnly={true}
          placeholder={"Your response goes here."}
        />
      </Row>
    );
  }

  const [showComponentItem, setshowComponentItem] = useState("prettified");
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

  const [copied, setCopied] = useState(false);

  return (
    <div>
      {data === "" ? (
        <div className="response-area text-secondary d-flex justify-content-center fs-6 fw-bold pt-5">
          <p className="me-3">Send a request</p>
          <p>
            <FeatherIcon icon="send" size="2.3em" className="request-icons" />
          </p>
        </div>
      ) : (
        <div className="response-area px-4">
          {Loading ? (
            <div className="text-center pt-5">
              <Button
                style={{ backgroundColor: "#17a2b8" }}
                variant="solid"
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
                  <Col md={4} key={index} >
                    <h4 style={style}>{value}</h4>
                    <p  style={style}>
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
                <ul>
                  <li
                    onClick={() => {
                      setshowComponentItem("prettified");
                    }}
                    style={{
                      color:
                        showComponentItem === "prettified" ? "#fafafa" : "",
                    }}
                  >
                    {contentType.toUpperCase()}
                  </li>
                  <li
                    onClick={() => {
                      setshowComponentItem("raw");
                    }}
                    style={{
                      color: showComponentItem === "raw" ? "#fafafa" : "",
                    }}
                  >
                    Raw
                  </li>
                </ul>
              </Row>
              <Row className="nav-body">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Response Body</p>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(
                        contentType === "json" || typeof data === "object"
                          ? JSON.stringify(data, null, 2)
                          : data
                      );
                      setCopied(true);
                    }}
                  >
                    <Tooltip
                      title={copied ? "Copied!" : "Copy"}
                      placement="top"
                    >
                      <FileCopyOutlined />
                    </Tooltip>
                  </p>
                </div>
              </Row>
              {showComponentItem === "prettified" ? (
                <Prettified key="prettified" />
              ) : (
                <Raw key="raw" />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(ResponseArea);
