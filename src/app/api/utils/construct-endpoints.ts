interface ConstructEndpointProps {
  endpoint: string;
  pathParams?: { [key: string]: string | number };
  queryParams?: { [key: string]: string | number | boolean };
}

export function constructEndpoint({ endpoint, pathParams, queryParams }: ConstructEndpointProps) {
  let fullPath = `${endpoint}`;

  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      fullPath = fullPath.replace(`{${key}}`, encodeURIComponent(String(value)));
    });
  }

  if (queryParams) {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value != null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    if (queryString) {
      fullPath += `?${queryString}`;
    }
  }

  return fullPath;
}
