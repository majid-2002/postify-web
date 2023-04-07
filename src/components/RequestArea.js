import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestArea() {
  return (
    <div className="request-area">
      <div className="d-flex justify-content-center px-4">
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            style={{ borderRadius: "6px 0 0 6px", paddingInline: "3.6em" }}
          >
            GET
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item>GET</Dropdown.Item>
            <Dropdown.Item>POST</Dropdown.Item>
            <Dropdown.Item>PUT</Dropdown.Item>
            <Dropdown.Item>PATCH</Dropdown.Item>
            <Dropdown.Item>DELETE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          placeholder="Enter request URL"
          type="text"
          className="bg-dark border-info border-opacity-75"
          style={{
            paddingInline: "1em",
            marginRight: "1.6em",
            borderRadius: "0 6px 6px 0",
            outline: "none",
            color: "#fafafa",
          }}
        />
        <Button variant="primary" style={{ width: "10%" }}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default RequestArea;
