import React, { Component } from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default class StudentDetails extends Component {

  

  state = {
    student: {}
  }

  render = () => {
    return (<Card>
      <CardActions>
        <Button variant="contained" onClick={this.editData} color="primary">Edit</Button>
        <Button variant="contained" color="secondary">Back</Button>
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="h2"> Student Details </Typography>
      </CardContent>
      

    </Card>);
  }
}