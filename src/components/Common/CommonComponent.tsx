import React, { ReactNode, useContext, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { RiContactsBookLine, RiContactsLine, RiGroupLine, RiHome2Fill, RiMessage3Line, RiSettings2Line, RiUser2Line } from "react-icons/ri";
import { CommonContext } from "../../context";
import { SidebarLinks } from "../../types";
import MainComponent from "../Chat/Main/MainComponent";
import Sidebar from "../Chat/Sidebar/Sidebar";


const CommonComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<'profile' | 'chat' | 'groups' | 'contacts' | 'settings'>('chat')
  const sideBarLinks: SidebarLinks[] = [
    {
      admin: false,
      path: "/profile",
      label: "Profile",
      icon: RiUser2Line,
      exact: true,
      name: "profile"
    },
    {
      admin: false,
      path: "/chat",
      label: "Chat",
      icon: RiMessage3Line,
      exact: true,
      name: "chat"
    },
    {
      admin: false,
      path: "/groups",
      label: "Groups",
      icon: RiGroupLine,
      exact: true,
      name: "groups"
    },
    {
      admin: false,
      path: "/contacts",
      label: "Contacts",
      icon: RiContactsLine,
      exact: true,
      name: "contacts"
    },
    {
      admin: false,
      path: "/settings",
      label: "Settings",
      icon: RiSettings2Line,
      exact: true,
      name: "settings"
    },
  ]
  const { theme } = useContext(CommonContext)
  return (
    <div style={{ color: `${theme.color}`, backgroundColor: `${theme.sidebarBackgroundColor}` }} className="relative min-h-screen max-w-screen flex flex-row justify-between">
      <div style={{ backgroundColor: `${theme.backgroundColor}` }} className=' w-full flex items-center justify-between'>
        <Sidebar setActive={setActive} active={active} sideBarLinks={sideBarLinks} />
        <div style={{ backgroundColor: `${theme.chatColor}`,color:`${theme.iconColor}` }} className="w-3/12 h-full flex flex-col items-center">{children}</div>
        <MainComponent />
      </div>
    </div>
  );
};

export default CommonComponent;
