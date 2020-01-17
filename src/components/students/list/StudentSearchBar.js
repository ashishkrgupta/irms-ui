import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classes from "../AdmissionForm.module.css"

export default class StudentSearchBar extends Component {

  onChange = () => {

  }

  render = () => {
    return (<Grid item xs={12} >
      <Grid  container direction="row" justify="flex-start" spacing={1} alignItems="center">
      <Grid item xs={2}>
        <FormControl className={ "width100percent " + classes.formControl}>
          <InputLabel id="class-select">Class</InputLabel>
          <Select
            labelId="class-select"
            //value={this.state.student.bloodGroup}
            //onChange={this.onFormInputChange}
          >
            <MenuItem value={''} >Select</MenuItem>
            <MenuItem value={'a+'} >A+ve</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl className={ "width100percent " + classes.formControl}>
          <InputLabel id="section-select">Section</InputLabel>
          <Select
            labelId="section-select"
            //value={this.state.student.bloodGroup}
            //onChange={this.onFormInputChange}
          >
            <MenuItem value={''} >Select</MenuItem>
            <MenuItem value={'a+'} >A+ve</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl className={ "width100percent " + classes.formControl}>
          <InputLabel id="roll-no-select">Roll No</InputLabel>
          <Select
            labelId="roll-no-select"
            //value={this.state.student.bloodGroup}
            //onChange={this.onFormInputChange}
          >
            <MenuItem value={''} >Select</MenuItem>
            <MenuItem value={'a+'} >A+ve</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl className={ "width100percent " + classes.formControl}>
          <InputLabel id="class-select">Class</InputLabel>
          <Select
            labelId="class-select"
            //value={this.state.student.bloodGroup}
            //onChange={this.onFormInputChange}
          >
            <MenuItem value={''} >Select</MenuItem>
            <MenuItem value={'a+'} >A+ve</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      </Grid>
      <Divider className="margintop10px"/>
    </Grid>);
  }

}