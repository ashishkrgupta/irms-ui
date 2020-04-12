import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import classes from './App.module.css';
import Header from '../components/header/Header';
import Sidenav from '../components/sidenav/Sidenav';
import AdmissionForm from '../components/students/AdmissionForm'
import FeeReceipt from '../components/feereceipt/FeeReceipt';
import Dashboard from '../components/dashboard/Dashboard'
import StudentList from '../components/students/list/StudentList'
import StudentDetails from "../components/students/details/StudentDetails"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BookIssue from '../components/library/issue/BookIssue';
import BookReturn from '../components/library/return/BookReturn';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {IRMS_SERVICE} from '../servers'

export default class App extends Component {

  constructor(props) {
    super(props);
    IRMS_SERVICE.interceptors.request.use(request => this.preRequest(request));
    IRMS_SERVICE.interceptors.response.use(response => this.postResponse(response), error => this.errorInterceptor(error) );
  }

  preRequest = (request) => {
    this.setState({loader:"block"});
    return request;
  }

  postResponse = (response) => {
    this.setState({loader:"none"});
    return response;
  }

  errorInterceptor = (response) => {
    this.setState({loader:"none"});
    return response;
  }
  
  state = {
    loader: "none",
    selectedSubMenu: "student-detail",
  };

  handleSubMenuClick = (subMenuId) => {
    this.setState({selectedSubMenu: subMenuId});
  }

  render() {
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Header/>
          <Sidenav onSubMenuClick={this.handleSubMenuClick}/>
          <Container className={classes['main-container']} maxWidth={false}>
            <Switch>
              <Route exact path="/dashboard"  component={Dashboard}/>
              <Route exact path="/new-student" component={AdmissionForm}/>
              <Route exact path="/edit-student/:id" component={AdmissionForm}/>
              <Route exact path="/fee-receipt" component={FeeReceipt}/>
              <Route exact path="/student-list" component={StudentList}/>
              <Route exact path="/student-detail" component={StudentDetails}/>
              <Route exact path="/student-detail/:id" component={StudentDetails}/>
              <Route exact path="/library/issue" component={BookIssue}/>
              <Route exact path="/library/return" component={BookReturn}/>
              
            </Switch>
          </Container>
        </div>
        
        <div style={{display: this.state.loader, minHeight: "800px", background: "#33333340", position: "relative", zIndex: 9999}}>
    {/*<LinearProgress style={{zIndex: "9999"}}/>*/}
          <Backdrop open={this.state.loader !== "none"} style={{zIndex: "9999"}} onClick={e=> { this.setState({isLoading: false}) }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </BrowserRouter>
      );
    }
}