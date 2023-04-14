import React, { useState } from "react";
import { Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";

function RequestInputArea({ endpoint, setEndpoint }) {
  const [showComponentItem, setshowComponentItem] = useState("parameter");
  const [parameter, setParameter] = useState([{ key: "", value: "" }]);
  const [header, setHeader] = useState([{ key: "", value: "" }]);

  return (
    <div className="request-input-area">
      <ul>
        <li
          onClick={() => {
            setshowComponentItem("parameter");
          }}
          style={{ color: showComponentItem === "parameter" ? "#fafafa" : "" }}
        >
          Parameters
        </li>
        <li
          onClick={() => {
            setshowComponentItem("body");
          }}
          style={{ color: showComponentItem === "body" ? "#fafafa" : "" }}
        >
          Body
        </li>
        <li
          onClick={() => {
            setshowComponentItem("header");
          }}
          style={{ color: showComponentItem === "header" ? "#fafafa" : "" }}
        >
          Header
        </li>
      </ul>
      {showComponentItem === "parameter" ? (
        <Parameters
          endpoint={endpoint}
          setEndpoint={setEndpoint}
          parameter={parameter}
          setParameter={setParameter}
        />
      ) : showComponentItem === "body" ? (
        <Body endpoint={endpoint} setEndpoint={setEndpoint} />
      ) : (
        <Headers
          endpoint={endpoint}
          setEndpoint={setEndpoint}
          header={header}
          setHeader={setHeader}
        />
      )}
    </div>
  );
}

// Parameters Component
function Parameters({ endpoint, setEndpoint, parameter, setParameter }) {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...parameter];
    list[index][name] = value;
    setParameter(list);
    const params = list.reduce((acc, item) => {
      if (item.key !== "" && item.value !== "") {
        acc[item.key] = item.value;
      }
      return acc;
    }, {});
    setEndpoint({ ...endpoint, params });
    if (list[list.length - 1].key !== "") {
      setParameter([...list, { key: "", value: "" }]);
    }
  };

  const handleAddClick = () => {
    setParameter([...parameter, { key: "", value: "" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...parameter];
    list.splice(index, 1);
    setParameter(list);
  };

  return (
    <div className="px-4 parameter-area">
      <p>Query Parameters</p>
      {parameter.map((param, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6}>
            <Form.Control
              value={param.key}
              name="key"
              type="text"
              placeholder={`Parameter ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              value={param.value}
              name="value"
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={1}>
            <FeatherIcon
              icon="delete"
              size="2.3em"
              className="request-icons"
              onClick={() => handleRemoveClick(index)}
            />
          </Col>
        </Row>
      ))}
      {parameter.length === 0 && (
        <div className="d-flex align-items-center justify-content-center btn-group-sm btn-parameter-container">
          <Button
            className="btn btn-outline-info btn-dark d-block"
            onClick={handleAddClick}
          >
            <FeatherIcon icon="plus" size="1.4em" />
            Add Parameter
          </Button>
        </div>
      )}
    </div>
  );
}


// Body Component
function Body({ setEndpoint, endpoint }) {
  const [contentType, setcontentType] = useState("JSON");

  function TextFormat() {
    const handleChange = (value) => {
      const contentTypes = {
        None: "",
        Text: "text/plain",
        JSON: "application/json",
        JavaScript: "application/javascript",
        HTML: "text/html",
        XML: "application/xml",
      };
      endpoint.contentType = contentTypes[contentType];
      endpoint.body = value;
    };

    return (
      <Col md={12}>
        {contentType === "None" ? (
          <p className="text-secondary text-center pt-5">
            This Request Doesn't have any body
          </p>
        ) : (
          <CodeMirror
            value={
              endpoint.contentType === "application/json"
                ? JSON.parse(JSON.stringify(endpoint.body, null, 2))
                : endpoint.body
            }
            theme={dracula}
            height="25vh"
            extensions={
              contentType === "JSON"
                ? [json()]
                : contentType === "JavaScript"
                ? [javascript()]
                : contentType === "HTML"
                ? [html()]
                : contentType === "XML"
                ? [xml()]
                : []
            }
            onChange={handleChange}
          />
        )}
      </Col>
    );
  }

  const handleDropDownValue = (event) => {
    const textInput = event.target.textContent;
    setcontentType(textInput);
    const contentTypes = {
      None: { body: "", contentType: "" },
      Text: { contentType: "text/plain" },
      JSON: { contentType: "application/json" },
      JavaScript: { contentType: "application/javascript" },
      HTML: { contentType: "text/html" },
      XML: { contentType: "application/xml" },
    };
    setEndpoint({ ...endpoint, ...contentTypes[textInput] });
  };

  return (
    <div className="px-4 parameter-area">
      <Row className="">
        <Col md={1} className="w-auto">
          <p>Content Type</p>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle
              variant="plain"
              className="custom-dropdown-toggle"
              style={{ fontSize: "1rem", padding: "0" }}
            >
              {contentType}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={handleDropDownValue}>None</Dropdown.Item>
              <Dropdown.Divider
                style={{ backgroundColor: "grey" }}
              ></Dropdown.Divider>
              <Dropdown.Item onClick={handleDropDownValue}>Text</Dropdown.Item>
              <Dropdown.Item onClick={handleDropDownValue}>JSON</Dropdown.Item>
              <Dropdown.Divider
                style={{ backgroundColor: "grey" }}
              ></Dropdown.Divider>
              <Dropdown.Item onClick={handleDropDownValue}>
                JavaScript
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDropDownValue}>HTML</Dropdown.Item>
              <Dropdown.Item onClick={handleDropDownValue}>XML</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="g-2">
        <TextFormat />
      </Row>
    </div>
  );
}


// Headers Component
function Headers({ endpoint, setEndpoint, setHeader, header }) {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...header];
    list[index][name] = value;
    setHeader(list);
    const headers = list.reduce((acc, item) => {
      if (item.key && item.value) {
        acc[item.key] = item.value;
      }
      return acc;
    }, {});
    setEndpoint({ ...endpoint, headers });
    if (list[list.length - 1].key !== "") {
      setHeader([...list, { key: "", value: "" }]);
    }
  };

  const handleAddClick = () => {
    setHeader([...header, { key: "", value: "" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...header];
    list.splice(index, 1);
    setHeader(list);
  };

  return (
    <div className="px-4 parameter-area">
      <p>Query Parameters</p>
      {header.map((head, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6}>
            <Form.Control
              value={head.key}
              name="key"
              type="text"
              placeholder={`Header ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              value={head.value}
              name="value"
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={1}>
            <FeatherIcon
              icon="delete"
              size="2.3em"
              className="request-icons"
              onClick={() => handleRemoveClick(index)}
            />
          </Col>
        </Row>
      ))}
      {header.length === 0 && (
        <div className="d-flex align-items-center justify-content-center btn-group-sm btn-parameter-container">
          <Button
            className="btn btn-outline-info btn-dark d-block"
            onClick={handleAddClick}
          >
            <FeatherIcon icon="plus" size="1.4em" />
            Add Header
          </Button>
        </div>
      )}
    </div>
  );
}


export default RequestInputArea;
