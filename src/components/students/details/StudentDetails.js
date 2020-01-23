import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
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
import classes from "./StudentDetails.module.css"

export default class AdmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        firstName: "Ashish",
        middleName: "Kumar",
        lastName: "Gupta",
        bloodGroup: "a+",
        nationality: "Indian",
        aadharNo: "123456789",
        religion: "Hindu",
        community: "OBC",
        languageKnown: "Englidh, Hindi",
        gender:"male",
        father: {},
        mother: {},
        resAddress: {},
        corAddress:{},
        documents:[{
          documentType:"",
          filename:""
        }],
        emergencyContacts:[{
            contactNumber:"",
            personName:"",
            relationWithStudent:""
          },
          {
            contactNumber:"",
            personName:"",
            relationWithStudent:""
          }
        ]
      }
    }
  }

  render() {
    return (<Card>
              <CardHeader
                style={{textAlign:"center", height:"25px"}}
                title = {this.state.student.firstName + " " + this.state.student.middleName + " " + this.state.student.lastName}
                titleTypographyProps = {{variant: "h5"}}
                />
              <CardContent>
                <form noValidate autoComplete="off">
                  <Typography variant="h5" component="h2">A. Student Information  </Typography>
                  <Divider className={classes["margin-bottom10px"]}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={9}>
                    <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">First Name</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.firstName}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Middle Name</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.middleName}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Last Name</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.lastName}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Blood Group</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { this.state.student.bloodGroup }
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Gender</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { this.state.student.gender }
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Date of Birth</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { this.state.student.dateOfBirth }
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Nationality</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { this.state.student.nationality }
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Religion</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.religion}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Community</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.community}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Aadhar No</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.aadharNo}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Language Known</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            {this.state.student.languageKnown }
                          </div>
                        </div>
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
                  <Divider  className={classes["margin-bottom10px"]}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Father's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">First Name</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.father.firstName }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Middle Name</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.father.middleName }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Last Name</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.father.lastName }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Mother's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">First Name</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.mother.firstName }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Middle Name</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.mother.middleName }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Last Name</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.mother.lastName }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Mobile Number</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.mobile }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Phone Number</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.phoneNumber }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Email Address</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.email }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " }>Residential Address</Typography>
                  <Divider className={classes["margin-bottom10px"] + ' ' + classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Address Line 1</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.resAddress.line1 }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Address Line 2</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.resAddress.line2 }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">City</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.resAddress.city }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">State/Provience</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.resAddress.state }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Country</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.resAddress.country }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Pin Code</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.resAddress.pin }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " }>Correspondence Address</Typography>
                  <Divider  className={classes["margin-bottom10px"] + ' ' + classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Address Line 1</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.corAddress.line1 }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Address Line 2</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.corAddress.line2 }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">City</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.corAddress.city }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">State/Provience</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.corAddress.state }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Country</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.corAddress.country }
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="MuiFormControl-root MuiTextField-root width100percent">
                        <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Pin Code</label>
                        <div className={"MuiInput-formControl " + classes.labelvalue}>
                          { this.state.student.corAddress.pin }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " }>Emergency Contact</Typography>
                  <Divider  className={classes["margin-bottom10px"] + ' ' + classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    {this.state.student.emergencyContacts.map((contact, i) => {
                      return [<Grid item xs={4} key={"0" + i}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Contact Number</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { contact.contactNumber }
                          </div>
                        </div>
                      </Grid>,
                      <Grid item xs={4} key={"1" + i}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Name of Contact Person</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { contact.personName }
                          </div>
                        </div>
                      </Grid>,
                      <Grid item xs={4} key={"2" + i}>
                        <div className="MuiFormControl-root MuiTextField-root width100percent">
                          <label className="Mui-focused MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink">Relation with Student</label>
                          <div className={"MuiInput-formControl " + classes.labelvalue}>
                            { contact.relationWithStudent }
                          </div>
                        </div>
                      </Grid>];
                    })}
                  </Grid>
                  <Typography variant="h5" component="h2"  className="margintop20px">C. Enclosure  </Typography>
                  <Divider  className={classes["margin-bottom10px"]}/>
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
            </Card>);
  }

}