import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestArea() {
  return (
    <div className="request-area">
      <div className="d-flex justify-content-center">
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            style={{ borderRadius: "6px 0 0 6px" , paddingInline : "3.6em"}}
          >
            GET
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          placeholder="Enter request URL"
          type="text"
          className="bg-dark w-75"
          style={{
            paddingInline: "2em",
            marginRight: "1em",
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
