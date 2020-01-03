import React, {Component} from 'react';
import classes from './App.module.css';
import Header from '../components/header/Header';
import Sidenav from '../components/sidenav/Sidenav';
import AdmissionForm from '../components/admissionform/AdmissionForm'
import FeeReceipt from '../components/feereceipt/FeeReceipt';

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
          <Sidenav
          onSubMenuClick={this.handleSubMenuClick}/>
          
          <main className={classes['main-container']}>
            { this.state.selectedSubMenu === "new-admission" && <AdmissionForm/> }
            { this.state.selectedSubMenu === "fee-receipt" && <FeeReceipt/> }
          </main>
        </div>
      );
    }
}