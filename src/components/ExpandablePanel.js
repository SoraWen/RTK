import React from "react";
import { useState } from "react";
import { GoChevronLeft, GoChevronDown } from "react-icons/go";

function ExpandablePanel({ header, children }) {
  //header為顯示刪除鍵跟名稱的地方

  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className=" mb-2 border rounded">
      <div className=" flex p-2 justify-between items-center ">
        <div className=" flex flex-row items-center justify-between ">
          {header}
        </div>
        <div onClick={handleClick} className="cursor-pointer">
          {/* //cursor-pointer是可以讓鼠標有反應 */}
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className=" p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
