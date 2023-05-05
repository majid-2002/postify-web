import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Alert } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Info from "@mui/icons-material/InfoOutlined";
import Fade from "@mui/material/Fade";

function RequestArea({ endpoint, setEndpoint, handleSubmit }) {
  const [showAlert, setShowAlert] = useState(false);

  const handleRequestType = (method) => {
    setEndpoint({ ...endpoint, method });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!endpoint.url) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="request-area">
      <Form onSubmit={handleFormSubmit}>
        <div className="d-flex justify-content-center px-3">
          <Dropdown>
            <Dropdown.Toggle className="rounded-0 btn-dropdown-request">
              {endpoint.method}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].map(
                (method) => (
                  <Dropdown.Item
                    key={method}
                    onClick={() => handleRequestType(method)}
                  >
                    {method}
                  </Dropdown.Item>
                )
              )}
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
            type="submit"
            className="btn-dropdown-request rounded-0 border-0 "
          >
            Send
          </Button>
        </div>
      </Form>
      <Fade in={showAlert}>
        <Alert
          startDecorator={<Info sx={{ mx: 0.5 }} color="info" />}
          variant="outlined"
          color="info"
          sx={{ width: 250 , height: 40, position: "relative" , top: 10, left: 25, zIndex: 1000,}}
        >
          <Typography sx={{ color: "white" }} fontWeight="medium">
            Please enter the URL.
          </Typography>
        </Alert>
      </Fade>
    </div>
  );
}

export default RequestArea;
