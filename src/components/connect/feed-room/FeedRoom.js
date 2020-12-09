import React from "react";
import styles from "./FeedRoom.module.css";

const FeedRoom = () => {
  return (
    <div>
      <nav
        className={[
          styles.navbar__entre,
          styles.bg__white,
          "navbar  navbar-expand-lg pl-0 pr-0",
        ].join(" ")}
      >
        <div className={"container p-0"}>
          <div className={"row w-100 m-0"}>
            <div
              className={"col-xl-3 d-flex d-lg-block justify-content-between"}
            >
              <a className={"navbar-brand"} href="#">
                <img src={"/images/entre/EntreLogo.png"} alt="" />
              </a>
              <button
                className={"navbar-toggler"}
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className={"navbar-toggler-icon"}></span>
              </button>
            </div>
            <div className={"col-xl-9"}>
              <div
                className={
                  "collapse navbar-collapse d-xl-flex justify-content-between align-items-center"
                }
                id="navbarNav"
              >
                <ul className={"navbar-nav flex-shrink-0 ml-auto"}>
                  <li className={"nav-item"}>
                    <form
                      action="#!"
                      className={`${
                        styles.form__search
                      } ${"d-flex justify-content-start align-items-center"}`}
                    >
                      <button className={"my-auto no__outline"}>
                        <img src={"/images/entre/Vector.png"} alt="search" />
                      </button>
                      <input
                        type="text"
                        className={
                          "form-control semi-bold color__gray-1 no__outline font__size--14"
                        }
                        placeholder="Search Something.."
                      />
                    </form>
                  </li>
                </ul>
                <ul
                  className={`${styles.list__navbar} ${"navbar-nav ml-auto"}`}
                >
                  <li className={"nav-item"}>
                    <a
                      className={
                        "nav-link icon semi-bold color__gray-1 font__size--14"
                      }
                      href="#"
                    >
                      <span className={`${"path"} ${"home"}`}></span>
                      <span>Home</span>
                    </a>
                  </li>
                  <li className={"nav-item active"}>
                    <a
                      className={
                        "nav-link icon semi-bold color__gray-1 font__size--14"
                      }
                      href="#"
                    >
                      <span className={"path network"}></span>
                      <span>Network</span>
                    </a>
                  </li>
                  <li className={"nav-item"}>
                    <a
                      className={
                        "nav-link icon semi-bold color__gray-1 font__size--14"
                      }
                      href="#"
                    >
                      <span className={"path market"}></span>
                      <span>Marketplace</span>
                    </a>
                  </li>
                  <li className={"nav-item"}>
                    <a
                      className={
                        "nav-link icon semi-bold color__gray-1 font__size--14"
                      }
                      href="#"
                    >
                      <span className={"path inbox"}></span>
                      <span>Inbox</span>
                    </a>
                  </li>
                </ul>
                <ul
                  className={
                    "navbar-nav list__navbar-profile flex-row ml-auto d-flex justify-content-between align-items-center"
                  }
                >
                  <li className={"nav-item"}>
                    <a href="#!" className={"nav-link calendar"}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z"
                          fill="#828282"
                        />
                        <path
                          d="M5 22H19C20.103 22 21 21.103 21 20V8V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V8V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z"
                          fill="#828282"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className={"nav-item dropdown"}>
                    <a
                      href="#!"
                      className={"nav-link add dropdown-toggle no__arrow"}
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                    <div
                      className={
                        "dropdown-menu list__dropdown create dropdown-menu-right"
                      }
                      aria-labelledby="dropdownMenuButton"
                    >
                      <h5 className={"bold font__size--16"}>Create</h5>
                      <hr />
                      <a
                        className={
                          "dropdown-item font__size--16 medium color__black"
                        }
                        href="#"
                      >
                        <img
                          src={"images/entre/Frame 41.png"}
                          className={"mr-3"}
                          alt=""
                        />{" "}
                        Post
                      </a>
                      <a
                        className={
                          "dropdown-item font__size--16 medium color__black"
                        }
                        href="#"
                      >
                        <img
                          src={"images/entre/Frame 42.png"}
                          className={"mr-3"}
                          alt=""
                        />{" "}
                        Event
                      </a>
                      <a
                        className={
                          "dropdown-item font__size--16 medium color__black"
                        }
                        href="#"
                      >
                        <img
                          src={"images/entre/Frame 43.png"}
                          className={"mr-3"}
                          alt=""
                        />{" "}
                        Job / Gig
                      </a>
                      <a
                        className={
                          "dropdown-item font__size--16 medium color__black"
                        }
                        href="#"
                      >
                        <img
                          src={"images/entre/Frame 44.png"}
                          className={"mr-3"}
                          alt=""
                        />{" "}
                        Room
                      </a>
                    </div>
                  </li>
                  <li className={"nav-item"}>
                    <a
                      href="#!"
                      className={
                        "nav-link profile notification position-relative"
                      }
                    >
                      <span className={"image"}>
                        <img src={"images/entre/Ellipse 1.png"} alt="" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-0 mt-4">
        <div className="container">
          <div className="row">
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
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      <img src={"/images/entre/Frame11.png"} alt="" /> My
                      Connections
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      <img src={"/images/entre/Frame12.png"} alt="" />{" "}
                      Connection Request
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      <img src={"/images/entre/Frame13.png"} alt="" />{" "}
                      Notifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      <img src={"/images/entre/Frame14.png"} alt="" /> Messages
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
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
                <img
                  src={"/images/entre/Group 2443.png"}
                  className="mb-4"
                  alt=""
                />

                <ul className={`${styles.list__menu_personal}`}>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      My Connections
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      Connection Request
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      Notifications
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className={`${styles.color__gray_2} ${styles.medium}`}
                    >
                      Messages
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- end:entre pro -->

					<!-- end:sidebar --> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedRoom;
