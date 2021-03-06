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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import classes from "./AdmissionForm.module.css"
import { IRMS_SERVICE } from "../../servers";
import AddressForm from "../common/AddressForm";
import {bloodGropupOptions, religionOptions, genderOptions, communityOptions, languageOptions, nationalityOptions } from '../common/OptionConfig'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default class AdmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      openStatus: false,
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
        dateOfBirth: new Date(),
        documents: [
          {
            documentType: "",
            fileName: ""
          }
        ],
        emailId: "",
        emergencyContacts: [
          {
            contactNumber: "",
            personName: "",
            relationWithStudent: ""
          },
          {
            contactNumber: "",
            personName: "",
            relationWithStudent: ""
          }
        ],
        enrollmentId: "",
        firstName: "",
        gender: "",
        languageKnown: [],
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
    student.dateOfBirth = date;//Moment(date).format('dd/MM/yyyy');
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

  onFileSelect = (event, index) => {
    let student = {...this.state.student};
    let doc = student.documents[index];
    doc.file = event.target.files[0];
    doc.fileName = doc.file.name;
    doc.documentType = doc.file.type;
    student.documents[index] = doc;
    this.setState({student});
  }
  
  saveData = async () => {
    let data = new FormData();
    let student = {...this.state.student};
    student.languageKnown = student.languageKnown.join(",");
    this.state.student.documents.forEach((doc, index) => {
      data.append(`files`, doc.file);
      //delete doc.file;
    });
    
    data.append("studentStr", JSON.stringify(student));
    IRMS_SERVICE.post("/students", data, { headers : {"content-type":"multipart/form-data"}}).then(
      resp => {
        if (resp.status === 200 ) {
          console.log(resp)
          let student = resp.data ? {...resp.data.body} : {};
          student.languageKnown = student.languageKnown ? student.languageKnown.split(",") : [];
          this.setState({student, studentCreated: true, openStatus: true, message: "Student data saved successfully."});
        } else {
          this.setState({openStatus: true, message: "Error while saving Student data. " + resp.message})
        }
      },
      error => {
        this.setState({studentCreated: false, openStatus: true, message: "Error while creating Student."});
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
          //response.data.dateOfBirth = Moment(response.data.dateOfBirth).format('d/MM/YYYY');
          let student = {...response.data.body};
          student.languageKnown = student.languageKnown.split(",");
          this.setState({student, isEdit: true});
        }
      });
    }
  }

  render() {
    return (<Card>
              <CardHeader
                style={{textAlign:"center", height:"25px"}}
                title = {this.state.isEdit ? this.state.student.firstName + " " + this.state.student.middleName + " " + this.state.student.lastName
                           : "New Admission" }
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
                            autoOk
                            variant="inline"
                            label="Date of Birth"
                            format="dd/MM/yyyy"
                            views={["year", "month", "date"]}
                            value={this.state.student.dateOfBirth }
                            onChange={this.onDOBChange}
                          />
                          </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={ "width100percent " + classes.formControl}>
                          <InputLabel id="nationality-select-label">Nationality</InputLabel>
                          <Select
                            labelId="nationality-select-label"
                            id="nationality-select"
                            value={this.state.student.nationality}
                            onChange={this.onFormInputChange}
                          >
                            {nationalityOptions.map(option => <MenuItem key={option.id} value={option.id} field="nationality">{option.text}</MenuItem>)}
                          </Select>
                        </FormControl>
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

                        <FormControl className={ "width100percent " }>
                          <InputLabel id="language-label">Language Known</InputLabel>
                          <Select
                            labelId="language-label"
                            multiple
                            value={this.state.student.languageKnown}
                            onChange={e => {
                              let student = {...this.state.student};
                              student.languageKnown = e.target.value;
                              this.setState({student})
                            }}
                            input={<Input />}
                            renderValue={selected => (
                              <div className={classes.chips}>
                                {selected.map(value => (
                                  <Chip key={value} label={value} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {languageOptions.map(name => (
                              <MenuItem key={name.id} value={name.id}> {name.text} </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                          value={ this.state.student.relatives && this.state.student.relatives[0] ? this.state.student.relatives[0].firstName : ""}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 0, 'firstName') }
                          />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" 
                          value={ this.state.student.relatives && this.state.student.relatives[0] ? this.state.student.relatives[0].middleName : ""}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 0, 'middleName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" 
                          value={ this.state.student.relatives && this.state.student.relatives[0] ? this.state.student.relatives[0].lastName : ""}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 0, 'lastName') }/>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Mother's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="First Name" 
                          value={ this.state.student.relatives && this.state.student.relatives[1] ? this.state.student.relatives[1].firstName : ""}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 1, 'firstName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Middle Name" 
                          value={ this.state.student.relatives && this.state.student.relatives[1] ? this.state.student.relatives[1].middleName : ""}
                          onChange={ e => this.updateRelativeDetails(e.target.value, 1, 'middleName') }/>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField className="width100percent" label="Last Name" 
                          value={ this.state.student.relatives && this.state.student.relatives[1] ? this.state.student.relatives[1].lastName : ""}
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
                    { this.state.student.emergencyContacts && this.state.student.emergencyContacts.map((contact, i) => {
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
                    { this.state.student.documents &&  this.state.student.documents.map((doc, index) => {
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
                        <InputBase type="file" inputProps={{ 'aria-label': 'naked' }} onChange={e => this.onFileSelect(e, index)}/>
                      </Grid>];
                    } )}
                    
                  </Grid>
                </form>
                <Snackbar
                  style={{zIndex:99999, top:"100px"}}
                  anchorOrigin={{ vertical:"top", horizontal:"center" }}
                  open={this.state.openStatus}
                  autoHideDuration={3000}
                  onClose={e => { 
                    this.setState({message:"", openStatus:false});
                    //this.props.history.push("/student-detail/" + this.state.student.id);
                  } }
                  message={this.state.message}
                >
                  <Alert 
                    severity={this.state.studentCreated ? "success" : "error"}
                    elevation={6} 
                    variant="filled"
                  > 
                    {this.state.message}
                  </Alert>
                </Snackbar>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={this.saveData} color="primary">Save</Button>
                <Button variant="contained" color="secondary">Cancel</Button>
              </CardActions>
            </Card>);
  }

}