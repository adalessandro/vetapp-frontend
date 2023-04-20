import { io } from "socket.io-client";
import { env } from "./configs/EnvironmentConfig";

export const socket = io(env.API_ENDPOINT_URL);
