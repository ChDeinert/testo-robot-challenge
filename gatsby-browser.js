import React from "react";
import { RobotProvider } from "./src/context/RobotContext";

export const wrapRootElement = ({ element }) => (
  <RobotProvider>{element}</RobotProvider>
);