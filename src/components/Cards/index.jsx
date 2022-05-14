import React from "react";
import styles from "./Cards.module.css";
import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/";

const Cards = ({ dataCards: { confirmed, recovered, deaths, lastUpdate } }) => {
  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">
        Global
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <CardComponent
          className={styles.infected}
          cardtitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardsubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardtitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardsubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardtitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardsubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Cards;
