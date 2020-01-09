import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
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
                <Typography color="textSecondary">Enter details for the new admission </Typography>
                <form noValidate autoComplete="off">
                  <Typography variant="h5" component="h2">A. Student Information  </Typography>
                  <Divider />
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={9}>
                    <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="First Name" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Middle Name" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Last Name" />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " + classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="blood-group"
                            value={''}
                            //onChange={handleChange}
                          >
                            <MenuItem value={''}>Select</MenuItem>
                            <MenuItem value={'a+'}>A+ve</MenuItem>
                            <MenuItem value={'a-'}>A-ve</MenuItem>
                            <MenuItem value={'b+'}>B+ve</MenuItem>
                            <MenuItem value={'b-'}>B-ve</MenuItem>
                            <MenuItem value={'o+'}>O+ve</MenuItem>
                            <MenuItem value={'o-'}>O-ve</MenuItem>
                            <MenuItem value={'ab+'}>AB+ve</MenuItem>
                            <MenuItem value={'ab-'}>AB-ve</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " + classes.formControl}>
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
                      <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className="width100percent"
                            disableToolbar
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="dd/MM/yyyy"
                            value={new Date()}
                            //onChange={handleDateChange}
                          />
                          </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Nationality" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Relegion" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Community" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Aadhar No" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Language Known" />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      <Card className={classes['profile-pic']}>
                        <CardContent>
                          <CardMedia className={classes['profile-pic']} image="./placeholder.png" />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Typography variant="h5" component="h2"  className="margintop20px">B. Parents/Guardian Information</Typography>
                  <Divider />
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Father's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="First Name" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Mother's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="First Name" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Mobile Number" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Phone Number" />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField className="width100percent" label="Email Address" />
                    </Grid>
                  </Grid>
                  
                </form>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">Save</Button>
                <Button variant="contained" color="secondary">Cancel</Button>
              </CardActions>
            </Card>);
  }

}