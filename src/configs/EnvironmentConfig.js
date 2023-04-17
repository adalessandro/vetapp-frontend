const API_HOST = process.env.API_HOST || "127.0.0.1";

const dev = {
  API_ENDPOINT_URL: `http://${API_HOST}:3001`,
};

const prod = {
  API_ENDPOINT_URL: "/api",
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
