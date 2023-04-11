import React, { useEffect, useState } from "react";
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
        <Parameters endpoint={endpoint} setEndpoint={setEndpoint} />
      ) : showComponentItem === "body" ? (
        <Body endpoint={endpoint} setEndpoint={setEndpoint} />
      ) : (
        <Headers endpoint={endpoint} setEndpoint={setEndpoint} />
      )}
    </div>
  );
}

function Parameters({ endpoint, setEndpoint }) {
  const [paramRows, setParamRows] = useState([{ param: "", value: "" }]);

  useEffect(() => {
    const urlParameters = {};
    paramRows.forEach(({ param, value }) => {
      if (param.trim() !== "" && value.trim() !== "") {
        urlParameters[param.trim()] = value.trim();
      }
      setEndpoint({ ...endpoint, params: urlParameters });
    });
    // eslint-disable-next-line
  }, [paramRows]);

  const handleInputChange = (index, key) => (event) => {
    const newParamRows = [...paramRows];
    newParamRows[index][key] = event.target.value;
    setParamRows(newParamRows);
    if (index === paramRows.length - 1 && event.target.value !== "") {
      setParamRows([...newParamRows, { param: "", value: "" }]);
    }
  };

  const handleDeleteRow = (index) => {
    const newParamRows = [...paramRows];
    newParamRows.splice(index, 1);
    setParamRows(newParamRows);
  };

  return (
    <div className="px-4 parameter-area">
      <p>Query Parameters</p>
      {paramRows.map((row, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder={`Parameter ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              value={row.param}
              onChange={handleInputChange(index, "param")}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              value={row.value}
              onChange={handleInputChange(index, "value")}
            />
          </Col>
          <Col md={1}>
            <FeatherIcon
              icon="delete"
              size="2.3em"
              className="request-icons"
              onClick={() => handleDeleteRow(index)}
            />
          </Col>
        </Row>
      ))}
      {paramRows.length === 0 && (
        <div className="d-flex align-items-center justify-content-center btn-group-sm btn-parameter-container">
          <Button
            className="btn btn-outline-info btn-dark d-block"
            onClick={() => setParamRows([{ param: "", value: "" }])}
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
  const [value, setValue] = useState("JSON");

  function TextFormat() {
    // I want to pass the value to setEndpoint({ ...endpoint, body: newValue }) but it is not working. help ME !!
    const handleChange = (value) => {
      let newValue = value.replace(/(\r\n|\n|\r)/gm, "").trim();
      endpoint.body = newValue;
    };

    return (
      <Col md={12}>
        <CodeMirror
          key={"dede"}
          theme={dracula}
          height="25vh"
          extensions={
            value === "JSON"
              ? [json()]
              : value === "JavaScript"
              ? [javascript()]
              : value === "HTML"
              ? [html()]
              : [xml()]
          }
          onChange={handleChange}
        />
      </Col>
    );
  }

  function handleDropDownValue(event) {
    setValue(event.target.textContent);
  }

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
              {value}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
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

function Headers({ endpoint, setEndpoint }) {
  const [headerRows, setHeaderRows] = useState([{ header: "", value: "" }]);

  useEffect(() => {
    const urlHeaders = {};
    headerRows.forEach(({ header, value }) => {
      if (header.trim() !== "" && value.trim() !== "") {
        urlHeaders[header.trim()] = value.trim();
      }
      setEndpoint({ ...endpoint, headers: urlHeaders });
    });
    // eslint-disable-next-line
  }, [headerRows]);

  function handleInputChange(index, key, value) {
    const newHeaderRows = [...headerRows];
    newHeaderRows[index][key] = value;
    setHeaderRows(newHeaderRows);
    if (index === headerRows.length - 1 && value !== "") {
      setHeaderRows([...newHeaderRows, { header: "", value: "" }]);
    }
  }

  function handleDeleteRow(index) {
    setHeaderRows(headerRows.filter((row, i) => i !== index));
  }

  return (
    <div className="px-4 parameter-area">
      <p>Header List</p>

      {headerRows.map((row, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6} className="">
            <Form.Control
              type="text"
              placeholder={`Header ${index + 1}`}
              value={row.header}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              onChange={(event) =>
                handleInputChange(index, "header", event.target.value)
              }
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
              value={row.value}
              onChange={(event) =>
                handleInputChange(index, "value", event.target.value)
              }
            />
          </Col>
          <Col md={1}>
            <FeatherIcon
              icon="delete"
              size="2.3em"
              className="request-icons"
              onClick={() => handleDeleteRow(index)}
            />
          </Col>
        </Row>
      ))}
      {headerRows.length === 0 && (
        <div className="d-flex align-items-center justify-content-center btn-group-sm btn-parameter-container">
          <Button
            className="btn btn-outline-info btn-dark d-block"
            onClick={() => setHeaderRows([{ param: "", value: "" }])}
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
