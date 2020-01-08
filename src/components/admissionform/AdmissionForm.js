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
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import classes from "./AdmissionForm.module.css"

export default class AdmissionForm extends Component {

  render() {
    return (<Card>
              <CardContent>
                <Typography variant="h5" component="h2"> New Admission  </Typography>
                <Typography className={classes.pos} color="textSecondary">Enter details for the new admission </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    
                    <Grid item xs={4}>
                      
                    <AccountCircle /><TextField className="width100percent" label="First Name" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Middle Name" />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField className="width100percent" label="Last Name" />
                    </Grid>
                    <Grid item xs={4}>
                      <Card className={classes['profile-pic']}>
                      <CardContent>
                      <CardMedia
                        className={classes['profile-pic']}
                        image="./placeholder.png"
                        title="Live from space album cover"
                      />
                      </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Blood Group" />
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        //onChange={handleChange}
                      >
                        <MenuItem value={''}>Select</MenuItem>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                      <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date picker dialog"
                          format="MM/dd/yyyy"
                          value={new Date()}
                          //onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Nationality" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Relegion" />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField className="width100percent" label="Community" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Aadhar No" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Language Known" />
                    </Grid>
                  </Grid>
                  <Divider className="margintop20px"/>
                  
                </form>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">Save</Button>
                <Button variant="contained" color="secondary">Cancel</Button>
              </CardActions>
            </Card>);
  }

}