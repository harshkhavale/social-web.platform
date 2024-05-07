import React from "react";

const OptionModal = ({ close }) => {
  return (
    <div className="optionmodal p-4 bg-white rounded-xl border shadow-md text-xs font-bold px-8">
      <ul className=" flex flex-col gap-2">
        <li>Edit</li>
        <li>Report</li>
        <li>Option3</li>
      </ul>
    </div>
  );
};

export default OptionModal;
