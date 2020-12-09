import React from "react";
import styles from './Footer.module.css';

function Footer() {
  return (
    <section className={`${styles.bg__white} ${styles.section__footer}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 my-auto">
            <ul className={`${styles.list__footer}`}>
              <li>
                <a href="#!" className={`${styles.bold} ${styles.font__size_12} ${styles.color__gray_4} `}>
                  Support
                </a>
              </li>
              <li>
                <a href="#!" className={`${styles.bold} ${styles.font__size_12} ${styles.color__gray_4} `}>
                  About
                </a>
              </li>
              <li>
                <a href="#!" className={`${styles.bold} ${styles.font__size_12} ${styles.color__gray_4} `}>
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 my-auto text-center">
            <span className={`${styles.bold} ${styles.color__gray_4} ${styles.font__size_12}`}>
              Entre Corporation - All Rights Reserved
            </span>
          </div>
          <div className="col-md-4 my-auto text-right">
            <ul className={`${styles.list__footer}`}>
              <li>
                <a href="#!" className={`${styles.bold} ${styles.color__blue} ${styles.font__size_12}`}>
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#!" className={`${styles.bold} ${styles.color__blue} ${styles.font__size_12}`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#!" className={`${styles.bold} ${styles.color__blue} ${styles.font__size_12}`}>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
