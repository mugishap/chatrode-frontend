import { createContext } from "react";
import { io } from "socket.io-client";
import { socketUrl } from "../api/url";

export const socket = io(socketUrl);

export const CommonContext = createContext<any>({});
