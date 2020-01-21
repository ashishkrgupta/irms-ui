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
        <div className={classes.root}>
          <Header/>
          <Sidenav onSubMenuClick={this.handleSubMenuClick}/>
          <Container className={classes['main-container']} maxWidth={false}>
            { this.state.selectedSubMenu === "new-admission" && <AdmissionForm/> }
            { this.state.selectedSubMenu === "fee-receipt" && <FeeReceipt/> }
            { this.state.selectedSubMenu === "dashboard" && <Dashboard/> }
            { this.state.selectedSubMenu === "student-list" && <StudentList/> }
            { this.state.selectedSubMenu === "student-detail" && <StudentDetails/> }
          </Container>
        </div>
      );
    }
}