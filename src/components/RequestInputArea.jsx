import React, { useState, useContext } from "react";
import { Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { UserContext } from "../App";


function RequestInputArea({ endpoint, setEndpoint }) {
  const [showComponentItem, setshowComponentItem] = useState("parameter");
  const { parameter, setParameter, header, setHeader } =
    useContext(UserContext);

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
    const removedParam = list.splice(index, 1)[0];

    // Only update endpoint.params if the deleted parameter had a non-empty key and value
    if (removedParam.key !== "" && removedParam.value !== "") {
      const params = list.reduce((acc, item) => {
        if (item.key !== "" && item.value !== "") {
          acc[item.key] = item.value;
        }
        return acc;
      }, {});
      setEndpoint({ ...endpoint, params });
    }

    setParameter(list);
  };

  return (
    <div className="px-3 parameter-area" data-testid="parameters-component">
      <p>Query Parameters</p>
      {parameter.map((param, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6}>
            <Form.Control
              autoComplete="off"
              value={param.key}
              name="key"
              type="text"
              placeholder={`Parameter ${index + 1}`}
              className="bg-dark text-white border-info border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              autoComplete="off"
              value={param.value}
              name="value"
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white border-info border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={1}>
            <FeatherIcon
              icon="delete"
              size="2rem"
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

  const contentTypes = {
    None: { body: "", contentType: "" },
    Text: { contentType: "text/plain" },
    JSON: { contentType: "application/json" },
    JavaScript: { contentType: "application/javascript" },
    HTML: { contentType: "text/html" },
    XML: { contentType: "application/xml" },
  };

  const handleDropDownValue = (event) => {
    const textInput = event.target.textContent;
    setcontentType(textInput);
    setEndpoint({ ...endpoint, ...contentTypes[textInput] });
  };

  return (
    <div className="px-3 body-area" data-testid="body-component">
      <Row className="">
        <Col md={1} className="w-auto">
          <p>Content Type</p>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle
              variant="plain"
              className="btn-dropdown-request-input"
            >
              {contentType}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {Object.keys(contentTypes).map((key) => (
                <Dropdown.Item
                  key={key}
                  onClick={handleDropDownValue}
                  className="dropdown-item"
                >
                  {key}
                </Dropdown.Item>
              ))}
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
    const removedHeader = list.splice(index, 1)[0];

    // Only update endpoint.headers if the deleted parameter had a non-empty key and value
    if (removedHeader.key !== "" && removedHeader.value !== "") {
      const headers = list.reduce((acc, item) => {
        if (item.key !== "" && item.value !== "") {
          acc[item.key] = item.value;
        }
        return acc;
      }, {});
      setEndpoint({ ...endpoint, headers });
    }

    setHeader(list);
  };

  return (
    <div className="px-3 parameter-area" data-testid="headers-component">
      <p>Header List</p>
      {header.map((head, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6}>
            <Form.Control
              autoComplete="off"
              value={head.key}
              name="key"
              type="text"
              placeholder={`Header ${index + 1}`}
              className="bg-dark text-white border-info border-opacity-75 rounded-0 form-control-sm"
              onChange={(e) => handleInputChange(e, index)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              autoComplete="off"
              value={head.value}
              name="value"
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white border-info border-opacity-75 rounded-0 form-control-sm"
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
