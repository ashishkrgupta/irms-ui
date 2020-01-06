import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import classes from './App.module.css';
import Header from '../components/header/Header';
import Sidenav from '../components/sidenav/Sidenav';
import AdmissionForm from '../components/admissionform/AdmissionForm'
import FeeReceipt from '../components/feereceipt/FeeReceipt';
import Dashboard from '../components/dashboard/Dashboard'

export default class App extends Component {
  
  state = {

    selectedSubMenu: "new-admission",
  };

  handleSubMenuClick = (subMenuId) => {
    console.log(subMenuId);
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
          </Container>
        </div>
      );
    }
}