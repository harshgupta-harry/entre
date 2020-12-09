import React from "react";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className="col-md-3">
      {/* <!-- start:sidebar -->

					<!-- start:personal menu --> */}
      <div
        className={`${styles.wrapper__menu} ${styles.personal} ${
          styles.bg__white
        } ${"mb-4"}`}
      >
        <div className="d-flex align-items-center profile">
          <img
            src={"/images/entre/Ellipse 1.png"}
            className="mr-3 flex-shrink-0"
            alt=""
          />
          <div className={`${styles.describe} `}>
            <h5 className="bold font__size--16 mb-0">Neil Whitfield</h5>
            <ul
              className={`${
                styles.list__personal
              } ${"semi-bold font__size--12 d-flex justify-content-between align-items-center"}`}
            >
              <li>
                <a href="#!">View</a>
              </li>
              <li>
                <a href="#!">Edit</a>
              </li>
              <li>
                <a href="#!">Share</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hr__personal" />

        <ul className={styles.list__menu_personal}>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              <img src={"/images/entre/Frame11.png"} alt="" /> My Connections
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              <img src={"/images/entre/Frame12.png"} alt="" /> Connection
              Request
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              <img src={"/images/entre/Frame13.png"} alt="" /> Notifications
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              <img src={"/images/entre/Frame14.png"} alt="" /> Messages
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              <img src={"/images/entre/Frame15.png"} alt="" /> Apply for
              Fundings
            </a>
          </li>
        </ul>
      </div>
      {/* <!-- end:personal menu -->


					<!-- start:entre pro --> */}
      <div
        className={`${styles.wrapper__menu} ${styles.personal} ${styles.bg__white}`}
      >
        <img src={"/images/entre/Group 2443.png"} className="mb-4" alt="" />

        <ul className={`${styles.list__menu_personal}`}>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              My Connections
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              Connection Request
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              Notifications
            </a>
          </li>
          <li>
            <a href="#!" className={`${styles.color__gray_2} ${styles.medium}`}>
              Messages
            </a>
          </li>
        </ul>
      </div>
      {/* <!-- end:entre pro -->

					<!-- end:sidebar --> */}
    </div>
  );
}

export default Sidebar;
