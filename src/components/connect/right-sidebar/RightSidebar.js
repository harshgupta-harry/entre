import React from "react";
import styles from "./RightSidebar.module.css";

function RightSidebar() {
  return (
    <div className="col-md-3">
      <ul className={[styles.list__carousel,"mb-5"].join(" ")}>
						<li>
							<a href="#!" className={["position-relative", styles.content,"no__outline"].join(" ")}>
								<span className={[styles.bold,styles.font__size_20,styles.color__black].join(" ")}>App of the day</span>
								<img src={"/images/entre/Group 2812.png"} alt=""/>
							</a>
						</li>
						{/* <li>
							<a href="#!" className="position-relative content no__outline">
								<span className="bold font__size--20 color__black">App of the day</span>
								<img src={"/images/entre/Group 2812.png"} alt=""/>
							</a>
						</li>
						<li>
							<a href="#!" className="position-relative content no__outline">
								<span className="bold font__size--20 color__black">App of the day</span>
								<img src={"/images/entre/Group 2812.png"} alt=""/>
							</a>
						</li>
						<li>
							<a href="#!" className="position-relative content no__outline">
								<span className="bold font__size--20 color__black">App of the day</span>
								<img src={"/images/entre/Group 2812.png"} alt=""/>
							</a>
						</li>
						<li>
							<a href="#!" className="position-relative content no__outline">
								<span className="bold font__size--20 color__black">App of the day</span>
								<img src={"/images/entre/Group 2812.png"} alt=""/>
							</a>
						</li> */}
					</ul>
      <h3 className={`${styles.bold} ${styles.font__size_16} ${"mb-3"}`}>Featured Event</h3>

      <div className={`${styles.wrapper__card_post} ${"mb-4"}`}>
        <img
          src={"/images/entre/image_processing20200827-19328-1pwdjtl 1.png"}
          className={`${styles.ellipse} ${"mb-4"}`}
          alt=""
        />
        <h5 className={[
        "bold",
        styles.font__size_16,
        styles.color__black_2,
        styles.lh__5,
        "mb-3",
      ].join(" ")}
      >
          Startup & Enterpreneur Networking
        </h5>

        <div
          className={`${
            styles.describe
          } ${"d-flex justify-content-start align-items-center mb-2"}`}
        >
          <img
            src={"/images/entre/Ellipse 90.png"}
            className={`${styles.ellipse} ${"flex-shrink-0 mr-3"}`}
            alt=""
          />
          <div className="info lh__2">
            <span className="semi-bold font__size--14">James Nichol</span><br/>
            <span className={`${styles.color__gray_4} ${styles.medium} ${styles.font__size_12} `}>
              CEO & Founder Zimaco
            </span>
          </div>
        </div>

        <a
          href="#!"
          className="bold btn btn-primary shadow w-100 color__white btn__15-45"
        >
          Register
        </a>
      </div>
      <div className={`${styles.wrapper__messaging}`}>
						
						<p className={`${styles.semi_bold} ${styles.font__size_13} ${styles.color__gray_2} ${"mb-3"} ${styles.lh__8}`}>you have a question and still can't find it? contact us by pressing the button below</p>

						<a href="#!" className={`${styles.color__white} ${styles.btn__oldblue} ${"btn btn-primary shadow bold font__size--16 w-100 btn__15-45"}`}><img src={"/images/entre/Frame 36.png"} className="mr-3" alt=""/> Messaging</a>

					</div>
    
    </div>
  );
}

export default RightSidebar;
