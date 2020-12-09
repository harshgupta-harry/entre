import React from "react";
import styles from "./OneToOneCall.module.css";
import PersonCard from "../person-card/PersonCard.js";
import ChatBox from "../chat-box/ChatBox.js";
import BottomButtons from "../bottom-buttons//BottomButtons";
import Grid from "@material-ui/core/Grid";

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
        className={styles.grid}
        style={{
          background: "#F8F8F8",
          // flexGrow: 1,
          width: "65%",
          justifyContent: "center",
          // alignItems: "center",
          display: "flex",
          overflowY: "auto",
          paddingLeft: 36,
          paddingRight: 36,
        }}
      >
        <Grid container direction="row" justify="center">
          <PersonCard />
          {/* <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard /> */}
        </Grid>

        <BottomButtons showMic={true} showExit={true} />
      </div>

      <ChatBox />
    </div>
  );
};
export default OneToOneCall;
