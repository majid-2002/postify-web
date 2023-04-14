import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestArea({ endpoint, setEndpoint, handleSubmit }) {
  const handleRequestType = (method) => {
    setEndpoint({ ...endpoint, method });
  };

  return (
    <div className="request-area">
      <div className="d-flex justify-content-center px-4">
        <Dropdown>
          <Dropdown.Toggle className="rounded-0 btn-dropdown-request">
            {endpoint.method}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].map((method) => (
              <Dropdown.Item
                key={method}
                onClick={() => handleRequestType(method)}
              >
                {method}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          value={endpoint.url}
          onChange={(e) => setEndpoint({ ...endpoint, url: e.target.value })}
          placeholder="Enter request URL"
          type="text"
          className="bg-dark border-info border-opacity-75 rounded-0 me-4 text-light"
          style={{
            borderRadius: "0 6px 6px 0",
          }}
        />
        <Button
          className="btn-dropdown-request rounded-0 border-0 "
          onClick={() => {
            handleSubmit();
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default RequestArea;
