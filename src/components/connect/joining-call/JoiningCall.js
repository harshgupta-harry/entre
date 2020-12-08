import React from "react";
import styles from "./JoiningCall.module.css";

const JoiningCall = () => {
  return (
    <>
      <nav class="navbar navbar__entre navbar-expand-lg bg__white pl-0 pr-0 join__call">
        <div class="container p-0">
          <a class="navbar-brand mx-auto" href="#">
            <img src="assets/images/EntreLogo.png" alt="" />
          </a>
          {/* </div> */}
        </div>
      </nav>

      <section class="p-0 position-relative h-100">
        <div class="container h-100 d-flex justify-content-center align-items-center">
          <div class="box__desc-join-call flex-shrink-0 text-center">
            <svg
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
                className={styles.animate__roate1}
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
            </svg>

            <h4 class="bold font__size--32 mt-5">Joining Room</h4>
            <p class="medium font__size--20 color__gray-1 lh__5">
              You can toogle your cam and mic while you’re waiting
            </p>
          </div>

          <div class="box__mic">
            <a
              href="#!"
              class="mx-auto d-flex justify-content-center align-items-center"
            >
              <img src="assets/images/Group 2580.png" alt="" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
export default JoiningCall;
