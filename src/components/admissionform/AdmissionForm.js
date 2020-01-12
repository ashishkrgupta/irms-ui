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
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import classes from "./AdmissionForm.module.css"

export default class AdmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        bloodGroup: "",
        gender:"",
        father: {},
        mother: {},
        resAddress: {},
        corAddress:{},
        documents:[{
          documentType:"",
          filename:""
        }]
      }
    }
  }

  addDocumentRow = () => {
    let student = {...this.state.student};
    student.documents.push({documentType:"", filename:"" });
    this.setState({student});
  }

  removeDocumentRow = (index) => {
    let student = {...this.state.student};
    if (student.documents.length > 1)
      student.documents.splice(index, 1);
    this.setState({student});
  }

  onFormInputChange = (event, child) => {
    let student = {...this.state.student};
    let key = null;
    if (event.target.attributes) { 
      key = event.target.getAttribute('field');
    }
    if (! key) {
      key = child.props.field;
    }
    if(!key) {
      return;
    }
    if (key.indexOf('.') > -1) {
      let keyArray = key.split('.');
      let currObj = null;
      keyArray.forEach((element, index) => {
        if (index < keyArray.length - 1) {
          currObj = student[element];
        } else {
          currObj[element] = event.target.value;
        }
      });

    } else {
      student[key] = event.target.value;
    }
    this.setState({student});
  }

  handleClosureChange = (event, child) => {
    let student = {...this.state.student};
    student.documents[child.props.docindex].documentType = event.target.value;
    this.setState({student});
  }

  onDOBChange = (date, dateStr) => {
    let student = {...this.state.student};
    student.dateOfBirth = dateStr;
    this.setState({student});
  }

  componentDidUpdate = () => {
    console.log(this.state.student);
  }

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
                        <TextField className="width100percent" label="First Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "firstName"}}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Middle Name"  
                          inputProps={{ onChange:this.onFormInputChange, field: "middleName"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Last Name"  
                          inputProps={{ onChange:this.onFormInputChange, field: "lastName"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " + classes.formControl}>
                          <InputLabel id="blood-group-select">Blood Group</InputLabel>
                          <Select
                            labelId="blood-group-select"
                            field="bloodGroup"
                            value={this.state.student.bloodGroup}
                            onChange={this.onFormInputChange}
                          >
                            <MenuItem value={''} field="bloodGroup">Select</MenuItem>
                            <MenuItem value={'a+'} field="bloodGroup">A+ve</MenuItem>
                            <MenuItem value={'a-'} field="bloodGroup">A-ve</MenuItem>
                            <MenuItem value={'b+'} field="bloodGroup">B+ve</MenuItem>
                            <MenuItem value={'b-'} field="bloodGroup">B-ve</MenuItem>
                            <MenuItem value={'o+'} field="bloodGroup">O+ve</MenuItem>
                            <MenuItem value={'o-'} field="bloodGroup">O-ve</MenuItem>
                            <MenuItem value={'ab+'} field="bloodGroup">AB+ve</MenuItem>
                            <MenuItem value={'ab-'} field="bloodGroup">AB-ve</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " + classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.student.gender}
                            onChange={this.onFormInputChange}
                          >
                            <MenuItem value={''} field="gender">Select</MenuItem>
                            <MenuItem value={'male'} field="gender">Male</MenuItem>
                            <MenuItem value={'female'} field="gender">Female</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className="width100percent"
                            disableToolbar
                            disableFuture
                            margin="normal"
                            label="Date of Birth"
                            format="dd/MM/yyyy"
                            inputValue={'15/01/2010'}
                            onChange={this.onDOBChange}
                          />
                          </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Nationality" 
                          inputProps={{ onChange:this.onFormInputChange, field: "nationality"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Relegion" 
                          inputProps={{ onChange:this.onFormInputChange, field: "relegion"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Community" 
                          inputProps={{ onChange:this.onFormInputChange, field: "community"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Aadhar No" 
                          inputProps={{ onChange:this.onFormInputChange, field: "aadharNo"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Language Known" 
                          inputProps={{ onChange:this.onFormInputChange, field: "languageKnown"}}/>
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
                      <TextField className="width100percent" label="First Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "father.firstName"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "father.middleName"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "father.lastName"}}/>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Mother's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="First Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "mother.firstName"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "mother.middleName"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" 
                          inputProps={{ onChange:this.onFormInputChange, field: "mother.lastName"}}/>
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
                  <Typography className={"margintop20px " }>Residential Address</Typography>
                  <Divider className={classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <TextField className="width100percent" label="Address Line 1" 
                          inputProps={{ onChange:this.onFormInputChange, field: "resAddress.line1"}}/>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField className="width100percent" label="Address Line 2" 
                          inputProps={{ onChange:this.onFormInputChange, field: "resAddress.line2"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="City" 
                          inputProps={{ onChange:this.onFormInputChange, field: "resAddress.city"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="State/Provience" 
                          inputProps={{ onChange:this.onFormInputChange, field: "resAddress.state"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Country" 
                          inputProps={{ onChange:this.onFormInputChange, field: "resAddress.country"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Pin Code" 
                          inputProps={{ onChange:this.onFormInputChange, field: "resAddress.pin"}}/>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " }>Correspondence Address</Typography>
                  <Divider className={classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <TextField className="width100percent" label="Address Line 1" 
                          inputProps={{ onChange:this.onFormInputChange, field: "corAddress.line1"}}/>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField className="width100percent" label="Address Line 2" 
                          inputProps={{ onChange:this.onFormInputChange, field: "corAddress.line2"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="City" 
                          inputProps={{ onChange:this.onFormInputChange, field: "corAddress.city"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="State/Provience" 
                          inputProps={{ onChange:this.onFormInputChange, field: "corAddress.state"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Country" 
                          inputProps={{ onChange:this.onFormInputChange, field: "corAddress.country"}}/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Pin Code" 
                          inputProps={{ onChange:this.onFormInputChange, field: "corAddress.pin"}}/>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " }>Emergency Contact</Typography>
                  <Divider className={classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Contact Number" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Name of Contact Person" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Relation with Student" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Contact Number" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Name of Contact Person" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField className="width100percent" label="Relation with Student" />
                    </Grid>
                  </Grid>
                  <Typography variant="h5" component="h2"  className="margintop20px">C. Enclosure  </Typography>
                  <Divider />
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    
                    { this.state.student.documents.map((doc, index) => {
                        return[<Grid item xs={1} key = {"doc_ctrl_" + index} style={{paddingTop: "14px"}} >
                          {index === 0 && <AddCircleIcon style={{ fontSize: 35, cursor: "pointer"  }} onClick={this.addDocumentRow}/>}
                          <RemoveCircleIcon style={{ fontSize: 35, cursor: "pointer", float:"right" }} onClick={ () => this.removeDocumentRow(index)}/>
                        </Grid>,
                        <Grid item xs={7} key = {"doc_" + index}>
                          <FormControl className={ "width100percent " + classes.formControl}>
                            <InputLabel id={"closure_" + index}>Document Type</InputLabel>
                            <Select
                              labelId={"closure_" + index}
                              value={doc.documentType}
                              onChange={this.handleClosureChange}
                            >
                              <MenuItem docindex = {index} value={''}>Select</MenuItem>
                              <MenuItem docindex = {index} value={'birthSertificate'}>Birth Certificate</MenuItem>
                              <MenuItem docindex = {index} value={'transferCertificate'}>Original copy of Transfer Certificate</MenuItem>
                              <MenuItem docindex = {index} value={'parentsPhoto'}>Passport size photograph of parent.</MenuItem>
                              <MenuItem docindex = {index} value={'aadhar'}>Photo copy of Aadhar</MenuItem>
                            </Select>
                          </FormControl>
                      </Grid>,
                      <Grid item xs={4} key = {"doc_file_" + index}>
                        <InputBase type="file" inputProps={{ 'aria-label': 'naked' }}/>
                      </Grid>];
                    } )}
                    
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