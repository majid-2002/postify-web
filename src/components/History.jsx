import React, { useEffect, useState, useContext } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { UserContext } from "../App";

function HistoryCard({ endpointLocal }) {
  const { setParameter, setHeader, setEndpoint } = useContext(UserContext);
  const { formattedDate, method, url, body, params, headers, contentType } =
    endpointLocal;
  const shortenedUrl = url.length > 27 ? url.substr(0, 27) + "..." : url;
  const methodClassName = `fs-5 ${method.toLowerCase()}-method`;

  const handleClick = () => {
    const paramsArray = Object.entries(params).map(([key, value]) => ({
      key,
      value,
    }));
    const headersArray = Object.entries(headers).map(([key, value]) => ({
      key,
      value,
    }));

    setEndpoint({
      params,
      headers,
      url,
      body,
      method,
      contentType,
    });

    setParameter(paramsArray);
    setHeader(headersArray);
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
  }));

  return (
    <LightTooltip
      title={`URL: ${url}`}
    >
      <div className="history-card rounded-2" onClick={handleClick}>
        <div className="row-cols-2 d-flex align-items-center">
          <div style={{ width: "70px" }} className="text-center">
            <h3 className={methodClassName}>{method}</h3>
          </div>
          <div className="p-2" style={{ width: "250px" }}>
            <p>{shortenedUrl}</p>
            <p>
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>
      </div>
    </LightTooltip>
  );
}

function History({ localStorageEndpoints }) {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    const updatedEndpoints = localStorageEndpoints.map(
      ({ dateAndTime, ...rest }) => {
        const date = new Date(dateAndTime);
        const formattedDate = `${date.getHours()}:${(
          "0" + date.getMinutes()
        ).slice(-2)} ${date.getDate()} ${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`;
        return { ...rest, formattedDate };
      }
    );
    setEndpoints(updatedEndpoints.reverse());
  }, [localStorageEndpoints]);

  return (
    <div className="history">
      <div className="history-text-area">
        <h2>History</h2>
      </div>
      <div className="history-card-area">
        {endpoints.map((endpoint) => (
          <HistoryCard
            key={`${endpoint.url}-${endpoint.method}-${endpoint.timestamp}`}
            endpointLocal={endpoint}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
