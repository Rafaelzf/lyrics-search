import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import styles from "./Card.module.css";
import CountUp from "react-countup";

const CardComponent = ({
  className,
  cardtitle,
  value,
  lastUpdate,
  cardsubtitle,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={3}
      component={Card}
      className={cx(styles.card, className)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {cardtitle}
        </Typography>
        <Typography variant="h5" component="h2">
          <CountUp start={0} end={value} duration={2.75} separator="." />
        </Typography>
        <Typography color="textSecondary">
          {new Date(lastUpdate).toLocaleString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        <Typography variant="body2" component="p">
          {cardsubtitle}
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default CardComponent;
