import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestArea() {
  return (
    <div className="request-area" style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
      <Dropdown style={{ width: "10%" }}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ borderRadius: "6px 0 0 6px" }}>
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Form.Control placeholder="Enter request URL" type="text" className="bg-dark" style={{ width: "70%", marginRight: "1em", borderRadius: "0 6px 6px 0", outline: "none", color: "#fafafa"}} />
      <Button variant="dark" className="btn-outline-primary" style={{ width: "10%", float: "right" }}>Send</Button>
    </div>
  );
}

export default RequestArea;
