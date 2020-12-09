import React from "react";
import styles from "./ChatBox.module.css";

const ChatBox = () => {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 28,
          borderBottom: "1px solid #B9B9B9",
          height: 115,
        }}
      >
        <div>
          <span className={styles.header_title}>Chat Room</span>
          <div className={styles.displayFlexRow} style={{ marginTop: 8 }}>
            <div
              style={{
                backgroundColor: "#68C671",
                height: 8,
                width: 8,
                borderRadius: 50,
              }}
            />
            <span className={styles.header_name}>Jason Derulo - Online</span>
          </div>
        </div>
        <div className={styles.header_close}>Close</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 115,
          bottom: 70,
          overflowY: "scroll",
          paddingLeft: 32,
          paddingRight: 32,
          marginTop: 15,
          marginBottom: 15,
          width: "35%",
        }}
      >
        <div>
          <div>
            <div style={{ position: "relative" }}>
              <img
                src="/images/meetings/Ellipse 519.png"
                alt=""
                style={{ height: 44, width: 44, marginTop: 32 }}
              />
              <div className={styles.onlineDot} />
            </div>
          </div>
          <div className={styles.otherChatMessage}>
            Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do
            lorem ipsum dolor .
          </div>
          <div className={styles.otherChatMessage}>
            I Really love your design. It’s Amazing !!!
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 28,
          borderTop: "1px solid #B9B9B9",
          height: 70,
          position: "absolute",
          bottom: 0,
          width: "35%",
        }}
      >
        <input
          className={`${styles.textinput}`}
          placeholder="Type your message here..."
        />
        <div
          style={{
            backgroundColor: "#003399",
            borderRadius: 8,
            height: 42,
            width: 42,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/images/meetings/Frame 48.png"
            style={{ height: 20, width: 20, objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
