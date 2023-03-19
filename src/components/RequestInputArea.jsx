import React from "react";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

function Json() {
  return (
    <Col md={12}>
      <Form.Control type="text" className="bg-dark" placeholder="Raw request body" style={{height: "5em"}} />
    </Col>
  );
}

function Parameters() {
  return (
    <div className="px-4 parameter-area">
      <p>Query parameter</p>
      <Row className="g-2">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Parameter 1"
            className="bg-dark"
          />
        </Col>
        <Col md={5}>
          <Form.Control type="text" placeholder="Value 1" className="bg-dark" />
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

function Body() {
  return (
    <div className="px-4 parameter-area">
      <Row className="">
        <Col md={1}>
          <p>Content Type</p>
        </Col>
        <Col md={1}>
          <Dropdown>
            <Dropdown.Toggle variant="plain" className="custom-dropdown-toggle">
              Dropdown
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
      <p>Query parameter</p>

      <Row className="g-2">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Parameter 1"
            className="bg-dark"
          />
        </Col>
        <Col md={5}>
          <Form.Control type="text" placeholder="Value 1" className="bg-dark" />
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

function RequestInputArea() {
  return (
    <div className="request-input-area">
      <ul>
        <li>Parameters</li>
        <li>Body</li>
        <li>Header</li>
      </ul>
      <Body />
    </div>
  );
}

export default RequestInputArea;
