import React from "react";

const BottomButtons = ({ showMic, showExit }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {showMic && (
        <a
          style={{
            height: 46,
            width: 46,
            backgroundColor: "#EB5757",
            marginLeft: 12,
            marginRight: 12,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            borderRadius: "50%",
          }}
        >
          <img
            src="/images/meetings/group 2580.png"
            alt=""
            style={{
              height: 20,
              width: 24,
              objectFit: "contain",
            }}
          />
        </a>
      )}
      {showExit && (
        <a
          style={{
            height: 46,
            width: 46,
            backgroundColor: "white",
            marginLeft: 12,
            marginRight: 12,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            borderRadius: "50%",
          }}
        >
          <img
            src="/images/meetings/exit.png"
            alt=""
            style={{
              height: 20,
              width: 24,
              objectFit: "contain",
            }}
          />
        </a>
      )}
    </div>
  );
};

export default BottomButtons;
