import React, { useState } from "react";
import { Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";

function RequestInputArea() {
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
        <Parameters />
      ) : showComponentItem === "body" ? (
        <Body />
      ) : (
        <Headers />
      )}
    </div>
  );
}

// Parameters Component
function Parameters() {
  const [paramRows, setParamRows] = useState([
    {
      Parameter: "",
      value: "",
    },
  ]);

  function addNextLine() {
    setParamRows([...paramRows, { param: "", value: "" }]);
  }

  function handleParamChange(index, event) {
    const newParamRows = [...paramRows];
    newParamRows[index].param = event.target.value;
    setParamRows(newParamRows);

    if (index === paramRows.length - 1 && event.target.value !== "") {
      addNextLine();
    }
  }

  function handleValueChange(index, event) {
    const newParamRows = [...paramRows];
    newParamRows[index].value = event.target.value;
    setParamRows(newParamRows);
  }

  function handleDeleteRow(index) {
    const newParamRows = [...paramRows];
    newParamRows.splice(index, 1);
    setParamRows(newParamRows);
  }

  function renderParamRow(row, index) {
    return (
      <Row className="g-2 my-1" key={index}>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder={`Parameter ${index + 1}`}
            className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
            value={row.param}
            onChange={(event) => handleParamChange(index, event)}
          />
        </Col>
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder={`Value ${index + 1}`}
            className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
            value={row.value}
            onChange={(event) => handleValueChange(index, event)}
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
    );
  }

  return (
    <div className="px-4 parameter-area">
      <p>Query Parameters</p>

      {paramRows.length > 0 ? (
        paramRows.map(renderParamRow)
      ) : (
        <div className="d-flex align-items-center justify-content-center btn-group-sm btn-parameter-container">
          <Button
            className="btn btn-outline-info btn-dark d-block"
            onClick={addNextLine}
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
function Body() {
  const [value, setValue] = useState("JSON");

  function Json() {
    const [code, setCode] = useState("");

    function handleChange(editor, data, value) {
      setCode(value);
    }

    return (
      <Col md={12}>
        <CodeMirror
          value={code}
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
            <Dropdown.Toggle variant="plain" className="custom-dropdown-toggle" style={{fontSize: "1rem", padding: "0"}}>
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
        <Json />
      </Row>
    </div>
  );
}

// Headers Component
function Headers() {
  const [headerRows, setHeaderRows] = useState([
    {
      header: "",
      value: "",
    },
  ]);

  function addNextLine() {
    setHeaderRows([...headerRows, { header: "", value: "" }]);
  }

  function handleHeaderChange(index, event) {
    const newHeaderRows = [...headerRows];
    newHeaderRows[index].header = event.target.value; //set the param with param index
    setHeaderRows(newHeaderRows);

    if (index === headerRows.length - 1 && event.target.value !== "") {
      //add next line if the there is 0 headers
      addNextLine();
    }
  }

  function handleDeleteRow(index) {
    const newHeaderRows = [...headerRows];
    newHeaderRows.splice(index, 1);
    setHeaderRows(newHeaderRows);
  }

  function handleValueChange(index, event) {
    const newHeaderRows = [...headerRows];
    newHeaderRows[index].value = event.target.value; //set the value using index
    setHeaderRows(newHeaderRows);
  }

  function renderHeaderRow(row, index) {
    return (
      <Row className="g-2 my-1" key={index}>
        <Col md={6} className="">
          <Form.Control
            type="text"
            placeholder={`Header ${index + 1}`}
            value={row.header}
            className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
            onChange={(event) => handleHeaderChange(index, event)}
          />
        </Col>
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder={`Value ${index + 1}`}
            className="bg-dark text-white border-primary border-opacity-75 rounded-0 form-control-sm"
            value={row.value}
            onChange={(event) => handleValueChange(index, event)}
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
    );
  }

  return (
    <div className="px-4 parameter-area">
      <p>Header List</p>

      {headerRows.length > 0 ? (
        headerRows.map(renderHeaderRow)
      ) : (
        <div className="d-flex align-items-center justify-content-center btn-group-sm btn-parameter-container">
          <Button
            className="btn btn-outline-info btn-dark d-block"
            onClick={addNextLine}
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
