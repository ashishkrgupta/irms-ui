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

export default class App extends Component {
  
  state = {

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
              <Route exact path="/"  component={Dashboard}/>
              <Route exact path="/new-student" component={AdmissionForm}/>
              <Route exact path="/edit-student" component={AdmissionForm}/>
              <Route exact path="/fee-receipt" component={FeeReceipt}/>
              <Route exact path="/student-list" component={StudentList}/>
              <Route exact path="/student-detail" component={StudentDetails}/>
              
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
      );
    }
}