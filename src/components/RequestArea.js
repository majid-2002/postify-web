import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function RequestArea({ endpoint, setEndpoint , handleSubmit}) {

  const handleRequestType = (e) => {
    setEndpoint({ ...endpoint, method: e.target.innerText });
  };

  return (
    <div className="request-area">
      <div className="d-flex justify-content-center px-4">
        <Dropdown className="">
          <Dropdown.Toggle className="rounded-0 btn-dropdown-request" >
            {endpoint.method}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item onClick={handleRequestType}>GET</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>POST</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>PUT</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>PATCH</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>DELETE</Dropdown.Item>
            <Dropdown.Item onClick={handleRequestType}>HEAD</Dropdown.Item>
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
        <Button className="btn-dropdown-request rounded-0" onClick={()=>{
          handleSubmit();
        }}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default RequestArea;
