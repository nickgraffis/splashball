import React, { useContext } from "react";
import { AppContext } from "../App";
import netlifyIdentity from "netlify-identity-widget"
import { Plus } from "./Icons/Plus";
import { VerticalDots } from "./Icons/VerticalDots";
import { ChevronDown } from "./Icons/ChevronDown";
import { MemberContext } from "./Members";
import { Logout } from "./Icons/Logout";

export const NavBar = () => {
  const { session } = useContext(AppContext);
  const { showEditor, setShowEditor } = useContext(MemberContext);

  return (
    <div className="flex z-30 justify-between p-6 border-b-2 backdrop-blur-lg backdrop-filter border-blueGray-600 sticky top-0">
      <div className="flex space-x-2 items-center">
        <span className="font-bold text-2xl">{session}</span>
        <ChevronDown />
      </div>
      <div className="flex items-center space-x-2 text-blueGray-400">
        <button onClick={() => setShowEditor && setShowEditor(true)}>
          <Plus />
        </button>
        <button>
          <VerticalDots />
        </button>
        <button onClick={() => netlifyIdentity.logout()}>
          <Logout />
        </button>
      </div>
    </div>
  )
}