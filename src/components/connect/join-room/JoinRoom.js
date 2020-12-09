import React from 'react'
import styles from './JoinRoom.module.css'
function JoinRoom() {
    return (
        <div className={["col-md-6",styles.list_networking_list,"gjhjhh"].join(" ")}>
						
            <div className={[styles.box__list_networking,styles.bg__white].join(" ")}>
                <div className={[styles.detail].join(" ")}>
                    <h4 className={[styles.bold,styles.font__size_16,"mb-3"].join(" ")}>Talking VC</h4>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className={[styles.people,"d-flex justify-content-start align-items-center"].join(" ")}>
                            <img src={"/images/entre/Ellipse 6.png"} alt=""/>
                            <img src={"/images/entre/Ellipse 7.png"} alt=""/>
                            <img src={"/images/entre/Ellipse 8.png"} alt=""/>
                            <img src={"/images/entre/Ellipse 9 (1).png"} alt=""/>
                        </div>
                        <span className={[styles.semi_bold,styles.font__size_14,styles.color__gray_4,"text-center"].join(" ")}>+ 25 Other</span>
                    </div>
                </div>
                <hr className="m-0"/>
                <a href="#!" className={[styles.medium,styles.color__blue,"d-inline-block","text-center"].join(" ")}>Join</a>
            </div>

        </div>
    )
}

export default JoinRoom
