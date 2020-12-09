import React from "react";
import styles from "./FeedRoom.module.css";
import Header from "../header/Header.js";
import Sidebar from "../sidebar/Sidebar";
import RightSidebar from "../right-sidebar/RightSidebar.js";
import Room from "../room/Room.js";
import Footer from "../footer/Footer";

const FeedRoom = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <section className="pt-0 mt-4">
        <div className="container">
          <div className="row">
            <Sidebar />
            <Room />
            <RightSidebar />
            
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FeedRoom;
