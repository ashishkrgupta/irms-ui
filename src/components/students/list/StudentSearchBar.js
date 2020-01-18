import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import classes from "../AdmissionForm.module.css"

export default class StudentSearchBar extends Component {

  state = {
    selectedOption: {
      class:'',
      section:'',
      rollNo: ''
    }
  }

  componentDidUpdate = () => {
    this.props.onChange && this.props.onChange(this.state.selectedOption);
  }

  onChangeClass = (event) => {
    let selectedOption = {...this.state.selectedOption};
    selectedOption.class = event.target.value;
    this.setState({selectedOption})
  }

  onChangeSection = (event) => {
    let selectedOption = {...this.state.selectedOption};
    selectedOption.section = event.target.value;
    this.setState({selectedOption})
  }

  onChangeRollNo = (event) => {
    let selectedOption = {...this.state.selectedOption};
    selectedOption.rollNo = event.target.value;
    this.setState({selectedOption})
  }

  onSearchClick = () => {
    this.props.onSearchClick && this.props.onSearchClick(this.state.selectedOption);
  }

  render = () => {
    return (<Grid item xs={12} >
      <Grid  container direction="row" justify="center" alignItems="center">
        <Grid item xs={2} style= {{margin: "0px 5px"}}>
          <FormControl className={ "width100percent " + classes.formControl}>
            <InputLabel id="class-select">Class</InputLabel>
            <Select
              labelId="class-select"
              value={this.state.selectedOption.class}
              onChange={this.onChangeClass}
            >
              <MenuItem value={''} >Select</MenuItem>
              <MenuItem value={'1'} >Class 1st</MenuItem>
              <MenuItem value={'2'} >Class 2nd</MenuItem>
              <MenuItem value={'3'} >Class 3rd</MenuItem>
              <MenuItem value={'4'} >Class 4th</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} style= {{margin: "0px 5px"}}>
          <FormControl className={ "width100percent " + classes.formControl}>
            <InputLabel id="section-select">Section</InputLabel>
            <Select
              labelId="section-select"
              value={this.state.selectedOption.section}
              onChange={this.onChangeSection}
            >
              <MenuItem value={''} >Select</MenuItem>
              <MenuItem value={'a'} >Section A</MenuItem>
              <MenuItem value={'b'} >Section B</MenuItem>
              <MenuItem value={'c'} >Section C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} style= {{margin: "0px 5px"}}>
          <FormControl className={ "width100percent " + classes.formControl}>
            <InputLabel id="roll-no-select">Roll No</InputLabel>
            <Select
              labelId="roll-no-select"
              value={this.state.selectedOption.rollNo}
              onChange={this.onChangeRollNo}
            >
              <MenuItem value={''} >Select</MenuItem>
              <MenuItem value={'a+'} >A+ve</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {this.props.onSearchClick && (<Grid item xs={2} style= {{margin: "0px 5px"}}>
          <Button variant="contained" onClick={this.onSearchClick} color="primary">Search</Button>
        </Grid>)}
      </Grid>
      <Divider className="margintop10px"/>
    </Grid>);
  }

}