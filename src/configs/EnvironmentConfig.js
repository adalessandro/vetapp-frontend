const API_HOST = process.env.REACT_APP_API_HOST || "localhost";

const dev = {
  API_ENDPOINT_URL: `http://${API_HOST}:3001`,
};

const prod = {
  API_ENDPOINT_URL: `http://${API_HOST}:3001`,
};

const test = {
  API_ENDPOINT_URL: "/api",
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};

export const env = getEnv();
