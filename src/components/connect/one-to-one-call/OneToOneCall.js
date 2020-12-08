import React from "react";
import styles from "./OneToOneCall.module.css";
import PersonCard from "../person-card/PersonCard.js";
import ChatBox from "../chat-box/ChatBox.js";

const OneToOneCall = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#F8F8F8",
          flexGrow: 1,
          width: "65%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <PersonCard />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            display: "flex",
            flexDirection: "row",
          }}
        >
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
        </div>
      </div>
      <ChatBox />
    </div>
  );
};
export default OneToOneCall;
