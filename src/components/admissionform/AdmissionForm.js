import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classes from "./AdmissionForm.module.css"

export default class AdmissionForm extends Component {

  render() {
    return (<Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  New Admission
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  enter details for the new admission
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="First Name" />
                    </Grid>
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="Middle Name" />
                    </Grid>
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="Last Name" />
                    </Grid>
                  </Grid>
                  <Divider className="margintop20px"/>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="With a grid" />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
              <CardActions>
                <Button size="small">Save</Button>
                <Button size="small">Cancel</Button>
              </CardActions>
            </Card>);
  }

}