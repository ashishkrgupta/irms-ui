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
import CardHeader from '@material-ui/core/CardHeader';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Moment from 'moment';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import classes from "./AdmissionForm.module.css"
import { IRMS_SERVICE } from "../../servers";
import AddressForm from "../common/AddressForm";
import {bloodGropupOptions, religionOptions, genderOptions, communityOptions, languageOptions } from '../common/OptionConfig'

export default class AdmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        aadharNumber: "",
        addmissionStandard: "",
        addressList: [
          {
            addressType: "",
            city: "",
            country: "",
            line1: "",
            line2: "",
            pin: "",
            state: ""
          }
        ],
        bloodGroup: "",
        community: "",
        dateOfBirth: "",
        documents: [
          {
            documentType: "",
            fileName: ""
          }
        ],
        emailId: "",
        emergencyContacts: [
          {
            contactNumber: "string",
            personName: "string",
            relationWithStudent: "string"
          }
        ],
        enrollmentId: "",
        firstName: "",
        gender: "",
        languageKnown: [""],
        lastName: "",
        middleName: "",
        nationality: "",
        relatives: [
          {
            firstName: "",
            lastName: "",
            middleName: "",
            relation: "father"
          },
          {
            firstName: "",
            lastName: "",
            middleName: "",
            relation: "mother"
          }
        ],
        religion: ""
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

  onAddressChange = (address, index) => {
    let student = {...this.state.student};
    student.addressList[index] = address;
    this.setState({student});
  }

  onDOBChange = (date, dateStr) => {
    let student = {...this.state.student};
    student.dateOfBirth = Moment(date).format('d/MM/YYYY');
    this.setState({student});
  }

  updateRelativeDetails = (val, index, key) => {
    let student = {...this.state.student};
    student.relatives[index][key] = val;
    this.setState({student});
  }

  updateEmergencyContact = (event) => {
    let student = {...this.state.student};
    student.emergencyContacts[event.target.attributes.index.value][event.target.attributes.field.value] = event.target.value;
    this.setState({student});
  }
  
  saveData = async () => {
    IRMS_SERVICE.post("/students", JSON.stringify(this.state.student)).then(
      resp => {
          console.log(resp)
      },
      error => {

      }
    );
   }



  componentDidMount = () => {
    console.log(this.props);
    if (this.props.location && this.props.location.pathname.indexOf("edit-student") > -1) {
      let stdId = this.props.match.params.id;
      IRMS_SERVICE.get("/students/" + stdId).then(response => {
        console.log(response);
        if(response) {
          response.data.dateOfBirth = Moment(response.data.dateOfBirth).format('d/MM/YYYY');
          this.setState({student: response.data});
        }
      });
    }
    //console.log(this.state.student);
  }

  render() {
    return (<Card>
              <CardHeader
                style={{textAlign:"center", height:"25px"}}
                title = "New Admission" 
                titleTypographyProps = {{variant: "h5"}}
                />
              <CardContent>
                <form noValidate autoComplete="off">
                  <Typography variant="h5" component="h2" style={{color: "#3f51b5"}}>A. Student Information  </Typography>
                  <Divider />
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={9}>
                    <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="First Name"
                          value={ this.state.student.firstName}
                          onChange= {this.onFormInputChange}
                          inputProps={{ field: "firstName"}}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Middle Name"  
                          value={ this.state.student.middleName}
                          inputProps={{ onChange:this.onFormInputChange, field: "middleName"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Last Name"  
                          value={ this.state.student.lastName}
                          inputProps={{ onChange:this.onFormInputChange, field: "lastName"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " }>
                          <InputLabel id="blood-group-select">Blood Group</InputLabel>
                          <Select
                            labelId="blood-group-select"
                            value={this.state.student.bloodGroup}
                            onChange={this.onFormInputChange}
                          >
                            {bloodGropupOptions.map(option => <MenuItem key={option.id} value={option.id} field="bloodGroup">{option.text}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " + classes.formControl}>
                          <InputLabel id="gender-select-label">Gender</InputLabel>
                          <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={this.state.student.gender}
                            onChange={this.onFormInputChange}
                          >
                            {genderOptions.map(option => <MenuItem key={option.id} value={option.id} field="gender">{option.text}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className="width100percent"
                            disableFuture
                            margin="normal"
                            label="Date of Birth"
                            format="dd/MM/yyyy"
                            openTo="date"
                            views={["year", "month", "date"]}
                            inputValue={this.state.student.dateOfBirth }
                            onChange={this.onDOBChange}
                          />
                          </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Nationality" 
                          inputProps={{ onChange:this.onFormInputChange, field: "nationality"}}/>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " }>
                          <InputLabel id="religion-select">Religion</InputLabel>
                          <Select
                            labelId="religion-select"
                            value={this.state.student.religion}
                            onChange={this.onFormInputChange}
                          >
                            {religionOptions.map(option => <MenuItem key={option.id} value={option.id} field="religion">{option.text}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " }>
                          <InputLabel id="community-select">Community</InputLabel>
                          <Select
                            labelId="community-select"
                            value={this.state.student.community}
                            onChange={this.onFormInputChange}
                          >
                            {communityOptions.map(option => <MenuItem key={option.id} value={option.id} field="community">{option.text}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField className="width100percent" label="Aadhar No" 
                          value={ this.state.student.aadharNumber}
                          inputProps={{ onChange:this.onFormInputChange, field: "aadharNumber"}}/>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField className="width100percent" label="Language Known" 
                          value={ this.state.student.languageKnown}
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
                  <Typography variant="h5" component="h2" style={{color: "#3f51b5"}} className="margintop20px">B. Parents/Guardian Information</Typography>
                  <Divider />
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Father's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="First Name" 
                          value={ this.state.student.relatives[0].firstName}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 0, 'firstName') }
                          />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" 
                          value={ this.state.student.relatives[0].middleName}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 0, 'middleName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" 
                          value={ this.state.student.relatives[0].lastName}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 0, 'lastName') }/>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Mother's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="First Name" 
                          value={ this.state.student.relatives[1].firstName}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 1, 'firstName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" 
                          value={ this.state.student.relatives[1].middleName}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 1, 'middleName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" 
                          value={ this.state.student.relatives[1].lastName}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 1, 'lastName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Mobile Number" />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Phone Number" />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField className="width100percent" label="Email Address"
                          value={ this.state.student.emailId}
                          inputProps={{ onChange:this.onFormInputChange, field: "emailId"}}/>
                    </Grid>
                  </Grid>
                  <AddressForm
                    title="Residential Address"
                    onChange={obj => this.onAddressChange(obj, 0)}
                  />
                  <AddressForm
                    title="Correspondence Address"
                    onChange={obj => this.onAddressChange(obj, 1)}
                  />
                  
                  <Typography className={"margintop20px " } style={{color: "#3f51b5"}}>Emergency Contact</Typography>
                  <Divider className={classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    {this.state.student.emergencyContacts.map((contact, i) => {
                      return [<Grid item xs={4} key={"0" + i}>
                        <TextField className="width100percent" inputProps={{ onChange:this.updateEmergencyContact, index:i, field: "contactNumber"}} label="Contact Number" />
                      </Grid>,
                      <Grid item xs={4} key={"1" + i}>
                        <TextField className="width100percent" inputProps={{ onChange:this.updateEmergencyContact, index:i, field: "personName"}}  value={contact.personName} label="Name of Contact Person" />
                      </Grid>,
                      <Grid item xs={4} key={"2" + i}>
                        <TextField className="width100percent" inputProps={{ onChange:this.updateEmergencyContact, index:i, field: "relationWithStudent"}}  value={contact.relationWithStudent} label="Relation with Student" />
                      </Grid>];
                    })}
                  </Grid>
                  <Typography variant="h5" component="h2"  className="margintop20px" style={{color: "#3f51b5"}}>C. Enclosure  </Typography>
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
                <Button variant="contained" onClick={this.saveData} color="primary">Save</Button>
                <Button variant="contained" color="secondary">Cancel</Button>
              </CardActions>
            </Card>);
  }

}