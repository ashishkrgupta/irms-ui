import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import Typography from '@material-ui/core/Typography';
import ReactToPrint from "react-to-print";
//import classes from "./FeeReceipt.module.css"

export default class FeeReceipt extends Component {

  render() {
    return (<Card>
      <CardHeader
        style={{textAlign:"center", height:"25px"}}
        action={
          <ReactToPrint
           trigger = { () => <IconButton>
            <PrintIcon />
          </IconButton>}
          content={() => this.componentRef}
          />

        }
        title = "Fee Receipt" 
        titleTypographyProps = {{variant: "h5"}}
        >
      </CardHeader>
      <CardContent>
        <Card style={{width:"600px", margin:"0px auto"}} id="toBePrinted" ref={el => (this.componentRef = el)}>
          <CardContent>
            <Typography style={{textAlign:"center", fontSize:"24px"}}>GURUKUL SHIKSHAN SANSTHAN</Typography>
            <Typography style={{textAlign:"center"}}>(Robertsganj, Mirzapur, UP. ESTD: 2020)</Typography>
            <Typography>Name</Typography><Typography>Ashish</Typography>
            <Typography>Class</Typography><Typography>Class 2</Typography>
            <Typography>Date</Typography><Typography>{new Date() + ""}</Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>);
  }

}