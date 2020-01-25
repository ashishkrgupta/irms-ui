import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classes from './Dashboard.module.css'

export default class Dashboard extends Component {

  render() {
    return(
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={6}>
          {this.renderTeachersOnLeaveToday()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTodayFeeCollection()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTeachersOnLeaveToday()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTodayFeeCollection()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTeachersOnLeaveToday()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTodayFeeCollection()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTeachersOnLeaveToday()}
        </Grid>
        <Grid item xs={6}>
          {this.renderTodayFeeCollection()}
        </Grid>
      </Grid>
    );
  }

  renderTeachersOnLeaveToday = () => {
    return(
      <Card className={classes.card}>
        <CardHeader className={classes['card-header']}
          style={{textAlign:"center", height:"20px", color: "#3f51b5"}}
          title = "Teachers on Leave Today"
          
          />
        <CardContent className={classes['card-content']}>

        </CardContent>
      </Card>
    );
  }

  renderTodayFeeCollection = () => {
    return(
      <Card className={classes.card}>
        <CardHeader className={classes['card-header']}
          style={{textAlign:"center", height:"20px", color: "#3f51b5"}}
          title = "Today's Fee Collection"
          />
        <CardContent className={classes['card-content']}>

        </CardContent>
      </Card>
    );
  }
}