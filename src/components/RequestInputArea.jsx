import React, { useState } from "react";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";


function RequestInputArea() {
  const [showComponentItem, setshowComponentItem] = useState("parameter");

  return (
    <div className="request-input-area">
      <ul>
        <li
          onClick={() => {
            setshowComponentItem("parameter");
          }}
        >
          Parameters
        </li>
        <li
          onClick={() => {
            setshowComponentItem("body");
          }}
        >
          Body
        </li>
        <li
          onClick={() => {
            setshowComponentItem("header");
          }}
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

function Parameters() {
  const [paramRows, setParamRows] = useState([
    { param: "", value: "" } // initial row
  ]);

  function addNextLine() {
    setParamRows([...paramRows, { param: "", value: "" }]); //add new param and row , with old values, to the paramrows
  }

  function handleParamChange(index, event) {
    const newParamRows = [...paramRows];
    newParamRows[index].param = event.target.value; //set the param with param index
    setParamRows(newParamRows);
  
    if (index === paramRows.length - 1 && event.target.value !== "") { // 
      addNextLine();
    }
  }
  

  function handleValueChange(index, event) {
    const newParamRows = [...paramRows];
    newParamRows[index].value = event.target.value; //set the value with value index
    setParamRows(newParamRows);
  }

  function handleDeleteRow(index) {
    if (index !== 0) {
      const newParamRows = [...paramRows];
      newParamRows.splice(index, 1);
      setParamRows(newParamRows);
    }
  }

  return (
    <div className="px-4 parameter-area">
      <p>Query Parameters</p>

      {paramRows.map((row, index) => (
        <Row className="g-2 my-1" key={index}>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder={`Parameter ${index + 1}`}
              className="bg-dark text-white"
              value={row.param}
              onChange={event => handleParamChange(index, event)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder={`Value ${index + 1}`}
              className="bg-dark text-white"
              value={row.value}
              onChange={event => handleValueChange(index, event)}
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
    </div>
  );
}


function Body() {


  function Json() {
    const [code, setCode] = useState("");
    function handleChange(editor, data, value) {
      setCode(value);
    }
    return (
      <Col md={12}>
          <CodeMirror
            value={code}
            theme="dark"
            height="23vh"
            inputMode="json"
            extensions={[json()]}
            onChange={handleChange}
          />
      </Col>
    );
  }

  return (
    <div className="px-4 parameter-area">
      <Row className="">
        <Col md={1} className="w-auto">
          <p>Content Type</p>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle variant="plain" className="custom-dropdown-toggle">
              JSON
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Header>Items</Dropdown.Header>
              <Dropdown.Item>application/json</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Divider
                style={{ backgroundColor: "grey" }}
              ></Dropdown.Divider>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
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

function Headers() {
  return (
    <div className="px-4 parameter-area">
      <p>Header List</p>
      <Row className="g-2">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Parameter 1"
            className="bg-dark text-white"
          />
        </Col>
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Value 1"
            className="bg-dark text-white"
          />
        </Col>
        <Col md={2}>
          <FeatherIcon
            icon="plus-circle"
            size="2.3em"
            className="request-icons"
          />
          <FeatherIcon icon="delete" size="2.3em" className="request-icons" />
        </Col>
      </Row>
    </div>
  );
}

export default RequestInputArea;
