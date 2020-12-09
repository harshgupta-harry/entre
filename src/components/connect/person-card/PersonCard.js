import React from "react";
import styles from "./PersonCard.module.css";
import Grid from "@material-ui/core/Grid";
const PersonCard = () => {
  return (
    <Grid item sm={4} style={{ marginTop: 0 }}>
      <div className={styles.container}>
        <div style={{ position: "relative" }}>
          <img
            src="/images/meetings/Ellipse 519.png"
            alt=""
            style={{ height: 90, width: 90, marginTop: 32 }}
          />
          <div className={styles.onlineDot} />
        </div>
        <span className={styles.name}>Luna Cyntya</span>
        <span className={styles.about}>
          Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do lorem
          ipsum dolor .
        </span>
        <div className={styles.cta}>
          <span className={styles.ctaText}>Connect</span>
        </div>
      </div>
    </Grid>
  );
};
export default PersonCard;
