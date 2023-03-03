import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import { CommonContext, socket } from "../../context";
import { addOnlineUser, removeOnlineUser } from "../../redux/slices/userSlice";
import { User } from "../../types";
import MainComponent from "../Chat/Main/MainComponent";
import Sidebar from "../Chat/Sidebar/Sidebar";


const CommonComponent: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { theme, socket, dispatch, user, onlineUsers } = useContext(CommonContext)
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      socket.emit('set-offline', {
        userId: user._id
      })
      dispatch(removeOnlineUser(user._id))
      this.window.alert('Are you sure you want to close this tab?');
      console.log('Tab is closing...');
    });
    if (onlineUsers.includes(user._id)) return
    socket.emit("set-online", {
      userId: user._id
    })
    dispatch(addOnlineUser(user._id))
    console.log(`Setting new user online ${user.fullname}`);
  }, [])

  socket.on("new-online", (newOnline: any) => {
    console.log(`New user online ${newOnline} `);
    dispatch(addOnlineUser(newOnline))
  })


return (
  <div style={{ color: `${theme.color}`, backgroundColor: `${theme.sidebarBackgroundColor}` }} className="relative min-h-screen max-w-screen flex flex-row justify-between">
    <div style={{ backgroundColor: `${theme.backgroundColor}` }} className=' w-full flex items-center justify-between'>
      <Sidebar />
      <div style={{ backgroundColor: `${theme.chatColor}`, color: `${theme.iconColor}` }} className="shadow-lg shadow-slate-200 w-3/12 h-full flex flex-col items-center">{children}</div>
      <MainComponent />
    </div>
  </div>
);
};

export default CommonComponent;
