import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Alert } from "@mui/joy";
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';

function RequestArea({ endpoint, setEndpoint, handleSubmit }) {
  const [hasError, setHasError] = useState(false);

  const handleRequestType = (method) => {
    setEndpoint({ ...endpoint, method });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!endpoint.url) {
      setHasError(true);
      return;
    }
    setHasError(false);
    handleSubmit();
  };

  return (
    <div className="request-area">
      <Form onSubmit={handleFormSubmit}>
        <div className="d-flex justify-content-center px-4">
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
      {hasError && (
        <Alert
          startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
          variant="soft"
          color="danger"
        >
          <Typography color="danger" fontWeight="md">
            This file was successfully deleted
          </Typography>
        </Alert>
      )}
    </div>
  );
}

export default RequestArea;
