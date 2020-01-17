import React, { Component } from "react"
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider'
import CardContent from '@material-ui/core/CardContent';
import StudentSearchBar from './StudentSearchBar'

export default class StudentList extends Component {

  state = {
    students : [{
      id: 1,
      firstName: "Ashish",
      middleName: "Kumar",
      lastName: "Gupta"
    },
    {
      id: 2,
      firstName: "Ajay",
      middleName: "Kumar",
      lastName: "Singh"
    },
    {
      id: 3,
      firstName: "Shweta",
      middleName: "",
      lastName: "Siddhpura"
    }],
    selectedStudent: {
      id: 3,
      firstName: "Shweta",
      middleName: "Ben",
      lastName: "Siddhpura"
    }
  };

  onChangeSearhBar = (event) => {
    console.log(event.target.value);
  }

  render = () => {
    return (<Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
      <StudentSearchBar
        onChane={this.onChangeSearhBar}
      />
      {this.renderContainer()}
    </Grid>);
  }

  renderContainer = () => {
    return (<Grid item xs={12}>
      <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
        <Grid item xs={3}>
          <List>
          {this.state.students.map(student => 
            <ListItem alignItems="flex-start" key={"student_" + student.id} button>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText primary={student.firstName + " " + student.middleName + " " + student.lastName}/>
            </ListItem> )
          }
          </List>
        </Grid>
        <Grid item xs={9}>
          {this.renderStudentDetail()}
        </Grid>
      </Grid>
    </Grid>);
  }

  renderStudentDetail = () => {
    let student = this.state.selectedStudent;
    return(<Card>
      <CardContent>
        <Typography variant="h5"  color="textSecondary">{student.firstName + " " + student.middleName + " " + student.lastName}</Typography>
        <Divider/>
        <Grid container >
          <Grid item xs={3}><Box component="div" color="primary.main">First Name</Box></Grid>
          <Grid item xs={3}><Box color="text.primary">{student.firstName}</Box></Grid>
          <Grid item xs={3}><Box color="primary.main">Middle Name</Box></Grid>
          <Grid item xs={3}><Box color="text.primary">{student.middleName}</Box></Grid>
          <Grid item xs={3}><Box color="primary.main">Last Name</Box></Grid>
          <Grid item xs={3}><Box color="text.primary">{student.lastName}</Box></Grid>
        </Grid>

        
      </CardContent>
    </Card>);
  }
}