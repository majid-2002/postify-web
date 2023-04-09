import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestArea() {

  const [requestType, setRequestType] = React.useState("GET");

  const handleRequestType = (e) => {
    setRequestType(e.target.innerText);
  };


  return (
    <div className="request-area">
      <div className="d-flex justify-content-center px-4">
        <Dropdown className="">
          <Dropdown.Toggle className="rounded-0 btn-dropdown-request" >
            {requestType}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item onClick={handleRequestType}>GET</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>POST</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>PUT</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>PATCH</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>DELETE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          placeholder="Enter request URL"
          type="text"
          className="bg-dark border-info border-opacity-75 rounded-0"
          style={{
            paddingInline: "1em",
            marginRight: "1.6em",
            outline: "none",
            color: "#fafafa",
          }}
        />
        <Button className="btn-dropdown-request rounded-0">
          Send
        </Button>
      </div>
    </div>
  );
}

export default RequestArea;
