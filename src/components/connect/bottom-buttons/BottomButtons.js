import React from "react";

const BottomButtons = ({ isRoomCall, showMic, showExit }) => {
  const containerStyle = isRoomCall
    ? {
        // position: "absolute",
        // bottom: 60,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 50,
        // marginTop: 30,
        alignSelf: "center",
      }
    : {
        position: "absolute",
        bottom: 60,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        alignSelf: "center",
        // marginBottom: 50,
        // marginTop: 30,
      };
  return (
    <div style={containerStyle}>
      {showMic && (
        <a
          style={{
            height: 66,
            width: 66,
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
              height: 26,
              width: 34,
              objectFit: "contain",
            }}
          />
        </a>
      )}
      {showExit && (
        <a
          style={{
            height: 66,
            width: 66,
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
              height: 26,
              width: 34,
              objectFit: "contain",
            }}
          />
        </a>
      )}
    </div>
  );
};

export default BottomButtons;
