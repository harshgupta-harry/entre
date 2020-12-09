import React from "react";
import styles from "./OneToOneCall.module.css";
import PersonCard from "../person-card/PersonCard.js";
import ChatBox from "../chat-box/ChatBox.js";
import BottomButtons from "../bottom-buttons//BottomButtons";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

const OneToOneCall = ({ isRoomCall }) => {
  const roomWidth = isRoomCall ? "75%" : "65%";
  const chatWidth = isRoomCall ? "25%" : "35%";
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
      className={styles.container}
    >
      <div
        style={{
          // position: "relative",
          background: "#F8F8F8",
          // flexGrow: 1,
          width: roomWidth,
          justifyContent: isRoomCall ? "flex-start" : "center",
          // alignItems: "center",
          display: "flex",
          overflowY: "auto",
          paddingLeft: 36,
          paddingRight: 36,
          flexDirection: "column",
          paddingTop: 70,
        }}
      >
        <Grid container direction="row" justify="center">
          {_.times(isRoomCall ? 6 : 1, (i) => (
            <PersonCard />
          ))}
        </Grid>

        <BottomButtons
          isRoomCall={isRoomCall}
          showMic={true}
          showExit={true}
          showAdd={isRoomCall ? true : false}
        />
      </div>

      <ChatBox chatWidth={chatWidth} isRoomCall={isRoomCall} />
    </div>
  );
};
export default OneToOneCall;
