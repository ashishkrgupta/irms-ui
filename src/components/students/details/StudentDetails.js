import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import LabelBox from '../../common/LabelBox'
import { Link } from 'react-router-dom';
import classes from "./StudentDetails.module.css"
import {IRMS_SERVICE} from '../../../servers'
import Moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class AdmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: { },
      docDialogOpen: false,
      docDialogTitle: "",
      docDialogImgSource:"",
    }
  }

  componentDidMount = () => {
    console.log(this.props)
    let studentId = this.props.match.params.id;
    IRMS_SERVICE.get("/students/" + studentId).then(response => {
      console.log(response);
      if(response) {
        this.setState({student: response.data.body});
      }
      
    });
  }

  handleDialogClose = () => {
    this.setState({docDialogOpen: false, docDialogTitle:"", docDialogImgSource:""});
  }

  render() {
    let father = this.state.student && this.state.student.relatives ? this.state.student.relatives.find(rel => { return rel.relation === 'father'; } ) : null;
    let mother = this.state.student && this.state.student.relatives ? this.state.student.relatives.find(rel => { return rel.relation === 'mother'; } ) : null;

    let resAddr = this.state.student && this.state.student.addressList ? this.state.student.addressList.find(addr => { return addr.addressType === 'resAddress'; } ) : null;
    let corAddr = this.state.student && this.state.student.addressList ? this.state.student.addressList.find(addr => { return addr.addressType === 'corAddress'; } ) : null;

    return (this.state.student && <Card>
              <CardHeader
                style={{textAlign:"center", height:"25px", color: "#3f51b5"}}
                title = {this.state.student.firstName + " " + this.state.student.middleName + " " + this.state.student.lastName}
                titleTypographyProps = {{variant: "h5"}}
                action={
                <Link to={"/edit-student/" + this.state.student.id}>
                  <Button variant="contained" color="primary">
                    <EditIcon />
                    Edit
                  </Button>
                </Link>
                }
                />
              <CardContent>
                <form noValidate autoComplete="off">
                  <Typography variant="h5" component="h2" style={{color: "#3f51b5"}}>A. Student Information  </Typography>
                  <Divider className={classes["margin-bottom10px"]}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={9}>
                    <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                      <Grid item xs={4}>
                        <LabelBox label="First Name" value={this.state.student.firstName}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Middle Name" value={this.state.student.middleName}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Last Name" value={this.state.student.lastName}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Blood Group" value={this.state.student.bloodGroup + "ve"}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Gender" value={this.state.student.gender}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Date of Birth" 
                                  value={this.state.student.dateOfBirth ? Moment(this.state.student.dateOfBirth).format('d-MMM-YYYY') : ""}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Nationality" value={this.state.student.nationality}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Religion" value={this.state.student.religion}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Community" value={this.state.student.community}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Aadhar Number" value={this.state.student.aadharNumber}/>
                      </Grid>
                      <Grid item xs={4}>
                        <LabelBox label="Language Known" value={this.state.student.languageKnown}/>
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
                  <Typography variant="h5" component="h2"  className="margintop20px" style={{color: "#3f51b5"}}>B. Parents/Guardian Information</Typography>
                  <Divider  className={classes["margin-bottom10px"]}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Father's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="First Name" value={father ? father.firstName : ""}/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Middle Name" value={father ? father.middleName : ""}/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Last Name" value={father ? father.lastName : ""}/>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textSecondary" className={classes.margintop15px} >Mother's Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="First Name" value={mother ? mother.firstName : ""}/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Middle Name" value={mother ? mother.middleName : ""}/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Last Name" value={mother ? mother.lastName : ""}/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Mobile Number" value={this.state.student.mobile}/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Phone Number" value={this.state.student.phoneNumber}/>
                    </Grid>
                    <Grid item xs={5}>
                      <LabelBox label="Email" value={this.state.student.emailId}/>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " } style={{color: "#3f51b5"}}>Residential Address</Typography>
                  <Divider className={classes["margin-bottom10px"] + ' ' + classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <LabelBox label="Line 1" value={ resAddr ? resAddr.line1 : "" }/>
                    </Grid>
                    <Grid item xs={6}>
                      <LabelBox label="Line 2" value={ resAddr ? resAddr.line2 : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="City" value={ resAddr ? resAddr.city : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="State/Provience" value={ resAddr ? resAddr.state : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Country" value={ resAddr ? resAddr.country : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Pin Code" value={ resAddr ? resAddr.pin : "" }/>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " } style={{color: "#3f51b5"}}>Correspondence Address</Typography>
                  <Divider  className={classes["margin-bottom10px"] + ' ' + classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                  <Grid item xs={6}>
                      <LabelBox label="Line 1" value={ corAddr ? corAddr.line1 : "" }/>
                    </Grid>
                    <Grid item xs={6}>
                      <LabelBox label="Line 2" value={ corAddr ? corAddr.line2 : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="City" value={ corAddr ? corAddr.city : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="State/Provience" value={ corAddr ? corAddr.state : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Country" value={ corAddr ? corAddr.country : "" }/>
                    </Grid>
                    <Grid item xs={3}>
                      <LabelBox label="Pin Code" value={ corAddr ? corAddr.pin : "" }/>
                    </Grid>
                  </Grid>
                  <Typography className={"margintop20px " } style={{color: "#3f51b5"}}>Emergency Contact</Typography>
                  <Divider  className={classes["margin-bottom10px"] + ' ' + classes.width25percent}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    { this.state.student.emergencyContacts && this.state.student.emergencyContacts.map((contact, i) => {
                      return [<Grid item xs={4} key={"0" + i}>
                        <LabelBox label="Contact Number" value={ contact.contactNumber }/>
                      </Grid>,
                      <Grid item xs={4} key={"1" + i}>
                        <LabelBox label="Name of Contact Person" value={ contact.personName }/>
                      </Grid>,
                      <Grid item xs={4} key={"2" + i}>
                        <LabelBox label="Relation with Student" value={ contact.relationWithStudent }/>
                      </Grid>];
                    })}
                  </Grid>
                  <Typography variant="h5" component="h2"  className="margintop20px" style={{color: "#3f51b5"}}>C. Enclosure  </Typography>
                  <Divider  className={classes["margin-bottom10px"]}/>
                  <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
                    { this.state.student.documents && this.state.student.documents.map((doc, index) => {
                        return[<Grid item xs={1} key = {"doc_ctrl_" + index} style={{paddingTop: "14px"}} ></Grid>,
                        <Grid item xs={7} key = {"doc_" + index}>
                          <LabelBox label="Document Type" value={ doc.documentType }/>
                      </Grid>,
                      <Grid item xs={4} key = {"doc_file_" + index}>
                        <IconButton onClick={()=> this.setState({docDialogImgSource:"", docDialogOpen:true, docDialogTitle:doc.documentType, docContent:doc.fileData })}>
                          <VisibilityIcon/>
                        </IconButton>
                        <IconButton>
                          <GetAppIcon/>
                        </IconButton>
                      </Grid>];
                    } )}
                  </Grid>
                </form>
              </CardContent>
              <Dialog
                open={this.state.docDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                maxWidth={"md"}
                height={"90%"}
              >
                <DialogTitle id="alert-dialog-slide-title">{this.state.docDialogTitle}</DialogTitle>
                <DialogContent>
                  { this.state.docContent && <div>
                      <object 
                      style={{width: '100%', height: '400pt'}} 
                      type="application/pdf" 
                      data={'data:application/pdf;base64,' + this.state.docContent}></object>
                      </div> 
                  }
                </DialogContent>
              </Dialog>
            </Card>);
  }

}