import React, { useContext, useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";
import { AiOutlineCheck } from "react-icons/ai"; // Import the checkmark icon
import "../App.css";

const Sidebar = () => {
  const blankBoard = {
    name: "",
    bgcolor: "#f60000",
    list: [],
  };

  const [boardData, setBoarddata] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);
  const { allboard, setAllBoard } = useContext(BoardContext);

  const setActiveboard = (i) => {
    let newBoard = { ...allboard };
    newBoard.active = i;
    setAllBoard(newBoard);
  };

  const addBoard = () => {
    let newB = { ...allboard };
    newB.boards.push(boardData);
    setAllBoard(newB);
    setBoarddata(blankBoard);
    setShowpop(!showpop);
  };

  

  const colorOptions = [
    "#ff9a9e",
    "#a18cd1",
    "#fbc2eb",
    "#FFF0F5",
    "#49afeb",
    "#FFE4C4", // Add more colors as needed
    "#5F9EA0",
    "#6495ED", // Add more colors as needed
    "#696969", // Add more colors as needed
   
  ];

  const handleCardClick = (color) => {
    setBoarddata({
      ...boardData,
      bgcolor: color,
    });
  };

  return (
    <div
      className={`bg-[#1d1d1d] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[42px]" : "w-[200px]"
      }`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <ChevronRight size={18}></ChevronRight>
          </button>
        </div>
      )}
      {!collapsed && (
        <div>
          <div className="workspace font-bold p-3 flex justify-between border-b border-b-[#4b6b8d29]">
            <h4> Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm p-1"
            >
              <ChevronLeft size={18}></ChevronLeft>
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-2">
              <h6>Your Boards</h6>

              <Popover
                isOpen={showpop}
                align="start"
                positions={["right", "top", "bottom", "left"]}
                content={
                  <div className="ml-3 p-1 w-56 flex flex-col justify-center items-center bg-gray-800 text-white rounded">
                    <button
                      onClick={() => setShowpop(!showpop)}
                      className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                    >
                      <X size={16}></X>
                    </button>
                    <h4 className="py-3 font-semibold">Create Board</h4>
                    <img src=".\doing.gif" className="" alt="doing" />
                    <div className="mt-3 flex flex-col items-start w-full">
                      <label htmlFor="title">
                        Board Title <span>*</span>
                      </label>
                      <input
                        value={boardData.name}
                        onChange={(e) =>
                          setBoarddata({ ...boardData, name: e.target.value })
                        }
                        type="text"
                        placeholder="Enter Board Title"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <label htmlFor="Color">Choose Background Colors</label>
                      <div className="background-selection ">
                        <div className="colors-section">
                          <div className="color-grid">
                            {colorOptions.map((color, index) => (
                              <div
                                key={index}
                                className={`color-item relative ${
                                  boardData.bgcolor === color ? "selected" : ""
                                }`}
                                style={{
                                  background: color,
                                  border:
                                    boardData.bgcolor === color
                                      ? "2px solid #000"
                                      : "none",
                                  width: "60px",
                                  height: "40px",
                                  borderRadius: "5px",
                                  position: "relative",
                                  margin: "3px",
                                }}
                                onClick={() => handleCardClick(color)}
                              >
                                {/* Show the checkmark icon if this card is selected */}
                                {boardData.bgcolor === color && (
                                  <AiOutlineCheck
                                    size={24}
                                    style={{
                                      color: "black",
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => addBoard()}
                        className="w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowpop(!showpop)}
                  className="hover:bg-slate-600 p-1 rounded-sm"
                >
                  <Plus size={16}></Plus>
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {allboard.boards &&
              allboard.boards.map((x, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={() => setActiveboard(i)}
                      className="px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500"
                    >
                      <span
                        className="w-6 h-max rounded-sm mr-2"
                        style={{ backgroundColor: `${x.bgcolor}` }}
                      >
                        &nbsp;
                      </span>
                      {/* name  */}
                      <div>
                        <span>{x.name}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
