import React from "react";
import JoinRoom from "../join-room/JoinRoom";
import styles from "./Room.module.css";

function Room() {
  return <div className="col-md-6">
		<div className={styles.wrapper__content}>
							
			<div className={`${styles.list__nav_tab} ${"position-relative"}`}>
				<ul className="nav nav-pills mb-3 d-flex justify-content-between align-items-center" id="pills-tab" role="tablist">
					<li className="nav-item" role="presentation">
						<a className={["nav-link",styles.bold,styles.color__gray_1,styles.active].join(" ")} id="pills-rooms-tab" data-toggle="pill" href="#pills-rooms" role="tab" aria-controls="pills-rooms" aria-selected="true">Rooms</a>
					</li>
					<li className="nav-item" role="presentation">
						<a className={["nav-link",styles.bold,styles.color__gray_1].join(" ")} id="pills-event-tab" data-toggle="pill" href="#pills-event" role="tab" aria-controls="pills-event" aria-selected="false">Event</a>
					</li>
					<li className="nav-item" role="presentation">
						<a className={["nav-link",styles.bold,styles.color__gray_1].join(" ")} id="pills-people-tab" data-toggle="pill" href="#pills-people" role="tab" aria-controls="pills-people" aria-selected="false">People</a>
					</li>
				</ul>
			</div>
			<div className={`${styles.detail_content} ${"pt-2"}`}>

				<div className="tab-content" id="pills-tabContent">
					<div className="tab-pane fade show active" id="pills-rooms" role="tabpanel" aria-labelledby="pills-rooms-tab">
						<div className="d-flex justify-content-start align-items-center mb-4">
							<ul className={[styles.list__submenu_filter,styles.medium,styles.font__size_14,"flex-shrink-0","mr-3"].join(" ")}>
								<li><a href="#!" className={["active"].join(" ")}>For you</a></li>
								<li><a href="#!">Connection</a></li>
								<li><a href="#!">Newest</a></li>
							</ul>

							<div className="d-flex justify-content-between align-items-center">
								<a href="#!" className={["btn",styles.btn__blue,styles.color__white,styles.shadow,styles.semi_bold,styles.font__size_14,styles.btn__14_14,"mr-3"].join(" ")}
								>Industry</a>
								<a href="#!" className={["btn",styles.btn__blue,styles.color__white,styles.shadow,styles.semi_bold,styles.font__size_14,styles.btn__14_14].join(" ")}>Location</a>
							</div>
						</div>
					</div>
					<div className="tab-pane fade" id="pills-event" role="tabpanel" aria-labelledby="pills-event-tab">2</div>
					<div className="tab-pane fade" id="pills-people" role="tabpanel" aria-labelledby="pills-people-tab">3</div>
				</div>

				<div className={`${styles.box__networking}`}>
					<div className={["d-flex justify-content-between align-items-center"].join(" ")}>
						<div>
							<h5 className={[styles.bold,styles.font__size_16].join(" ")}>1  - On - 1 Networking</h5>
							<p className={['m-0',styles.semi_bold,styles.font__size_11,styles.color__gray_4].join(" ")}>Get matched instantly with other like-minded people</p>
						</div>
						
						<div className="dropdown">
							<button className={[styles.dropdown_toggle,styles.filter, styles.semi_bold,styles.font__size_14,styles.btn__filter_general,
							,styles.no__outline,styles.color__gray_1].join(" ")} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								General
							</button>
							<div className={["dropdown-menu",styles.list__dropdown,styles.normal].join(" ")}  aria-labelledby="dropdownMenuButton">
								<a className="dropdown-item" href="#">Action</a>
								<a className="dropdown-item" href="#">Another action</a>
								<a className="dropdown-item" href="#">Something else here</a>
							</div>
						</div>
						<a href="#!" className={["btn",styles.btn__outlined_blue,styles.color__blue,styles.no__opacity,styles.semi_bold,styles.font__size_14,styles.btn__13_25].join(" ")}>Join</a>
					</div>
				</div>
				<div className={`${"row mt-4"} ${styles.list__networking}`}>
					<JoinRoom />
					<JoinRoom />
					<JoinRoom />
					<JoinRoom />
					<JoinRoom />
					<JoinRoom />
				</div>
			</div>
		</div>
  </div>;
}

export default Room;
