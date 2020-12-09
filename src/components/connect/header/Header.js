import React from "react";
import styles from "./Header.module.css";

function header() {
  return (
    <nav
      className={["navbar",styles.navbar__entre,"navbar-expand-lg",styles.bg__white,"pl-0 pr-0"].join(" ")}
    >
     
      <div className={"container p-0"}>
        <div className={"row w-100 m-0"}>
          <div className={"col-xl-3 d-flex d-lg-block justify-content-between"}>
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
              <ul className={`${"navbar-nav"} ${styles.list__navbar} ${"ml-auto"}`}>
                <li className={"nav-item"}>
                  <a
                    className={`${"nav-link"} ${styles.icon} ${"semi-bold"} ${styles.color__gray_1} ${"font__size_14"}`}
                    href="#"
                  >
                    <span className={`${styles.path} ${styles.home}`}></span>
                    <span>Home</span>
                  </a>
                </li>
                <li className={"nav-item active"}>
                  <a
                    className={`${"nav-link"} ${styles.icon} ${"semi-bold"} ${styles.color__gray_1} ${"font__size_14"}`}
                    href="#"
                  >
                    <span  className={`${styles.path} ${styles.network}`}></span>
                    <span>Network</span>
                  </a>
                </li>
                <li className={"nav-item"}>
                  <a
                   className={`${"nav-link"} ${styles.icon} ${"semi-bold"} ${styles.color__gray_1} ${"font__size_14"}`}
                    href="#"
                  >
                    <span className={`${styles.path} ${styles.market}`}></span>
                    <span>Marketplace</span>
                  </a>
                </li>
                <li className={"nav-item"}>
                  <a
                    className={`${"nav-link"} ${styles.icon} ${"semi-bold"} ${styles.color__gray_1} ${"font__size_14"}`}
                    href="#"
                  >
                    <span className={`${styles.path} ${styles.inbox}`}></span>
                    <span>Inbox</span>
                  </a>
                </li>
              </ul>
              <ul
                className={[
                  "navbar-nav",
                  styles.list__navbar_profile,
                  "flex-row",
                  "ml-auto",
                  "d-flex justify-content-between align-items-center",
                ].join(" ")}
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
                <li className={[
                      "nav-item",
                      "dropdown"
                    ].join(" ")}>
                  <a
                    href="#!"
                    className={[
                      "nav-link",
                      styles.add,
                      styles.dropdown_toggle,
                      "no__arrow",
                    ].join(" ")}
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
                    className={[
                      "nav-link",
                      styles.profile,
                      styles.notification,
                      "position-relative"
                    ].join(" ")}
                  >
                    <span className={"image"}>
                      <img src={"/images/entre/Ellipse 1.png"} alt="" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default header;
