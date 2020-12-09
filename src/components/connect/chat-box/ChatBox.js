import React from "react";
import styles from "./ChatBox.module.css";

const ChatBox = ({ chatWidth, isRoomCall }) => {
  const ChatComponent = ({ isSenderUser }) => {
    return (
      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: isSenderUser ? "flex-end" : "flex-start",
        }}
      >
        <div
          style={{
            maxWidth: 298,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {!isSenderUser && (
            <div style={{ position: "relative" }}>
              <img
                src="/images/meetings/Ellipse 519.png"
                alt=""
                style={{ height: 44, width: 44 }}
              />
              {/* <div className={styles.onlineDot} /> */}
            </div>
          )}
          <div
            style={{
              marginLeft: 15,
              marginRight: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: isSenderUser ? "flex-end" : "flex-start",
            }}
          >
            <div className={styles.nameOnChat}>Jason Derulo</div>
            <div className={styles.chatNameAbout}>
              American Singer, Songwriter...
            </div>
          </div>
          {isSenderUser && (
            <div style={{ position: "relative" }}>
              <img
                src="/images/meetings/Ellipse 519.png"
                alt=""
                style={{ height: 44, width: 44 }}
              />
              {/* <div className={styles.onlineDot} /> */}
            </div>
          )}
        </div>
        <div className={styles.otherChatMessage}>
          Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do lorem
          ipsum dolor .
        </div>
        <div className={styles.otherChatMessage}>
          I Really love your design. It’s Amazing !!!
        </div>
        <div className={styles.timeStampOfChat}>30 Seconds ago</div>
      </div>
    );
  };
  return (
    <div className={styles.container} style={{ width: chatWidth }}>
      <div
        style={{
          // display: "flex",
          // alignItems: "center",
          // // padding: 28,
          borderBottom: "1px solid #B9B9B9",
          // height: 115,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 28,
            // borderBottom: "1px solid #B9B9B9",
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
        {isRoomCall && (
          <div className={styles.headerBar}>
            <div className={styles.headerRooms}>
              <span style={{ color: "#18243A" }}>Rooms</span>
            </div>
            <div className={styles.headerRooms}>Direct Message</div>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: isRoomCall ? 218 : 115,
          bottom: 70,
          overflowY: "scroll",
          paddingLeft: 32,
          paddingRight: 32,
          marginTop: 15,
          marginBottom: 15,
          width: chatWidth,
        }}
      >
        <ChatComponent isSenderUser={false} />
        <ChatComponent isSenderUser={false} />

        <ChatComponent isSenderUser={true} />
        <ChatComponent isSenderUser={false} />

        {isRoomCall && (
          <div className={styles.callMessage}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 20,
                paddingRight: 42,
                paddingTop: 20,
              }}
            >
              <div>
                <img
                  src="/images/meetings/Ellipse 519.png"
                  alt=""
                  style={{ height: 44, width: 44 }}
                />
              </div>
              <div style={{ marginLeft: 16 }}>
                <div className={styles.callRequestName}>Alex want to join</div>
                <div className={styles.callRequestDescription}>
                  Simplify interface andexperience since 2012. Feel..
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 72,
                paddingLeft: 72,
                marginTop: 18,
              }}
            >
              <div className={styles.callAccept}>Accept</div>
              <div className={styles.callDecline}>Decline</div>
            </div>
          </div>
        )}
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
          width: chatWidth,
        }}
        className={styles.box}
      >
        <input
          className={styles.textinput}
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
