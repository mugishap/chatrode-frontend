import React, { ReactNode, useContext, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { CommonContext } from "../../context";
import MainComponent from "../Chat/Main/MainComponent";
import Sidebar from "../Chat/Sidebar/Sidebar";


const CommonComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
 
  const { theme } = useContext(CommonContext)
  return (
    <div style={{ color: `${theme.color}`, backgroundColor: `${theme.sidebarBackgroundColor}` }} className="relative min-h-screen max-w-screen flex flex-row justify-between">
      <div style={{ backgroundColor: `${theme.backgroundColor}` }} className=' w-full flex items-center justify-between'>
        <Sidebar />
        <Slide direction="down" style={{ backgroundColor: `${theme.chatColor}`, color: `${theme.iconColor}` }} className="w-3/12 h-full flex flex-col items-center">{children}</Slide>
        <MainComponent />
      </div>
    </div>
  );
};

export default CommonComponent;
