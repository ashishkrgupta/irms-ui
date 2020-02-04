import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import classes from './App.module.css';
import Header from '../components/header/Header';
import Sidenav from '../components/sidenav/Sidenav';
import AdmissionForm from '../components/students/AdmissionForm'
import FeeReceipt from '../components/feereceipt/FeeReceipt';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dashboard from '../components/dashboard/Dashboard'
import StudentList from '../components/students/list/StudentList'
import StudentDetails from "../components/students/details/StudentDetails"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BookIssue from '../components/library/issue/BookIssue';
import BookReturn from '../components/library/return/BookReturn';
import {IRMS_SERVICE} from '../servers'

export default class App extends Component {

  constructor(props) {
    super(props);
    IRMS_SERVICE.interceptors.request.use(request => this.preRequest(request));
    IRMS_SERVICE.interceptors.response.use(response => this.postResponse(response), error => this.errorInterceptor(error) );
  }

  preRequest = (request) => {
    console.log("pre", request);
    this.setState({loader:"block"});
    return request;
  }

  postResponse = (response) => {
    console.log("post", response);
    this.setState({loader:"none"});
    return response;
  }

  errorInterceptor = (response) => {
    console.log("post", response);
    return response;
  }
  
  state = {
    loader: "none",
    selectedSubMenu: "student-detail",
  };

  handleSubMenuClick = (subMenuId) => {
    //console.log(subMenuId);
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
        
        <div style={{display: this.state.loader, minHeight: "800px", background: "#33333340", position: "relative", zIndex: 9999}}><LinearProgress style={{zIndex: "9999"}}/></div>
      </BrowserRouter>
      );
    }
}