import React from "react";
import styles from "./JoiningCall.module.css";

const JoiningCall = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* <nav className="navbar navbar__entre navbar-expand-lg bg__white pl-0 pr-0 join__call">
        <div className="container p-0">
          <a className="navbar-brand mx-auto" href="#">
            <img src="assets/images/EntreLogo.png" alt="" />
          </a>
          </div>
        </div>
      </nav> */}
      <div
        style={{
          height: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a>
          <img
            src="/images/meetings/EntreLogo.png"
            alt=""
            style={{ height: 30, width: 100, objectFit: "contain" }}
          />
        </a>
      </div>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={styles.loader}></div>
        {/* <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50ZM12.5 50C12.5 70.7107 29.2893 87.5 50 87.5C70.7107 87.5 87.5 70.7107 87.5 50C87.5 29.2893 70.7107 12.5 50 12.5C29.2893 12.5 12.5 29.2893 12.5 50Z"
            fill="#E0E0E0"
          />
          <path
            classNameName={styles.animate__roate1}
            d="M50 93.75C50 97.2018 47.1911 100.04 43.7662 99.6099C39.342 99.0539 35.0027 97.9075 30.8658 96.194C24.7995 93.6812 19.2876 89.9983 14.6447 85.3553C10.0017 80.7124 6.31876 75.2004 3.80602 69.1342C2.09249 64.9973 0.946049 60.658 0.39012 56.2338C-0.0402358 52.8089 2.79822 50 6.25 50C9.70178 50 12.447 52.8172 13.0196 56.2211C13.4878 59.0038 14.2696 61.7313 15.3545 64.3506C17.2391 68.9003 20.0013 73.0343 23.4835 76.5165C26.9657 79.9987 31.0997 82.7609 35.6494 84.6455C38.2686 85.7304 40.9962 86.5122 43.7789 86.9804C47.1828 87.553 50 90.2982 50 93.75Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="95.1219"
              y1="85.8974"
              x2="4.9976"
              y2="14.0549"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#94E3FC" />
              <stop offset="0.210892" stop-color="#00C4FF" />
              <stop offset="0.588421" stop-color="#003399" />
              <stop offset="1" stop-color="#00297B" />
            </linearGradient>
          </defs>
        </svg> */}
        <span className={styles.heading}>Joining Room</span>
        <span className={styles.subHeading}>
          You can toogle your cam and mic while you’re waiting
        </span>

        <a
          style={{
            height: 46,
            width: 46,
            backgroundColor: "#EB5757",
            position: "absolute",
            bottom: 60,
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
      </div>
    </div>
  );
};
export default JoiningCall;
