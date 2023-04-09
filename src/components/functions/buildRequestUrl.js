export default function buildRequestUrl(url, headers, params, body) {
    let requestUrl = url; // base URL
    
    let curlRequest = `curl -X ${requestUrl} `;
  
    // Add headers to cURL request
    if (headers) {
      Object.keys(headers).forEach((key) => {
        curlRequest += `-H '${key}: ${headers[key]}' `;
      });
    }
  
    // Add params to request URL
    if (params) {
      let queryString = "";
      Object.keys(params).forEach((key) => {
        queryString += `${key}=${params[key]}&`;
      });
      requestUrl += `?${queryString.slice(0, -1)}`;
    }
  
    // Add body to cURL request
    if (body) {
      curlRequest += `-d '${JSON.stringify(body)}' `;
    }
  
    // Add final URL to cURL request
    curlRequest += `'${requestUrl}'`;
  
    return curlRequest;
  }
  