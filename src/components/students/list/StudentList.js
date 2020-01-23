import React, { Component } from "react"
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import StudentSearchBar from './StudentSearchBar'
import classes from './StudentList.module.css'

export default class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state.students = this.state.allStudents;
  }

  state = {
    students : [],
    allStudents : [{
      id: 1, enrollmentId:"1",
      firstName: "Ashish",
      middleName: "Kumar",
      lastName: "Gupta"
    },
    { id: 2, enrollmentId:"2", firstName: "Ajay", middleName: "Kumar", lastName: "Singh" },
    { id: 3, enrollmentId:"3", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 4, enrollmentId:"4", firstName: "Ramesh", middleName: "Kumar", lastName: "Pandey" },
    { id: 5, enrollmentId:"5", firstName: "Deepak", middleName: "", lastName: "Chaudhary" },
    { id: 6, enrollmentId:"6", firstName: "Aashik", middleName: "", lastName: "Manandhar" },
    { id: 7, enrollmentId:"7", firstName: "Manish", middleName: "Kumar", lastName: "" },
    { id: 8, enrollmentId:"8", firstName: "Chirag", middleName: "", lastName: "Joshi" },
    { id: 9, enrollmentId:"9", firstName: "Utsav", middleName: "Bhai", lastName: "Mehta" },
    { id: 10, enrollmentId:"10", firstName: "Bhavdip", middleName: "", lastName: "Bhalodia" },
    { id: 11, enrollmentId:"11", firstName: "Jagan", middleName: "", lastName: "Siddhpura" },
    { id: 12, enrollmentId:"12", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 13, enrollmentId:"13", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 14, enrollmentId:"14", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 15, enrollmentId:"15", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 16, enrollmentId:"16", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 17, enrollmentId:"17", firstName: "Shweta", middleName: "", lastName: "Siddhpura" },
    { id: 18, enrollmentId:"18", firstName: "Shweta", middleName: "", lastName: "Siddhpura" }],
    selectedStudent: null,
  };

  onChangeSearhBar = (option) => {
    console.log(option);
  }

  editStudent = () => {
    console.log("edit student");
  }

  onFilterInputChange = (event) => {
    let key = event.target.getAttribute('field');
    let allStudents = [...this.state.allStudents];
    let filtered = allStudents.filter(std => { 
      //  console.log(std[key]);
      return (std[key] + "").toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 ; });
    this.setState({students: filtered});
  }

  render = () => {
    return (<Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
      <StudentSearchBar
        //onChange={this.onChangeSearhBar}
        onSearchClick={this.onChangeSearhBar}
      />
      {this.renderTable()}
      {//this.renderContainer()
      }
    </Grid>);
  }

  renderTable = () => {
    return(<Paper className = {classes['.table-container']} >
      <TableContainer style={{maxHeight:"500px"}}>
      <Table stickyHeader aria-label="customized table">
        <TableHead style={{background:"black"}}>
          <TableRow>
            <TableCell align="center">Enrollment Id</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Middle Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Class</TableCell>
            <TableCell align="center">Section</TableCell>
            <TableCell align="center">Roll No</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "enrollmentId", placeholder:"enrollment id"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "firstName", placeholder:"first name"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "middleName", placeholder:"middle name"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "lastName", placeholder:"last name"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "class", placeholder:"class"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "section", placeholder:"section"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <TextField 
                className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "rollNo", placeholder:"roll no"}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px"></TableCell>
          </TableRow>
          {this.state.students.map(student => (
            <TableRow key={student.id}>
              <TableCell align="center" component="th" scope="row">{student.enrollmentId}</TableCell>
              <TableCell align="center">{student.firstName}</TableCell>
              <TableCell align="center">{student.middleName}</TableCell>
              <TableCell align="center">{student.lastName}</TableCell>
              <TableCell align="center">{student.class}</TableCell>
              <TableCell align="center">{student.section}</TableCell>
              <TableCell align="center">{student.rollNo}</TableCell>
              <TableCell align="center" className="padding0px" style={{width:"100px", height:"52px", display:"flex"}}>
                <IconButton><VisibilityIcon/></IconButton>
                <IconButton><EditIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        //rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.students.length}
        rowsPerPage={10}
        page={1}
        //onChangePage={handleChangePage}
        //onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>);
  }

  renderContainer = () => {
    return (<Grid item xs={12}>
      <Grid container direction="row" justify="flex-start" spacing={1} alignItems="center">
        <Grid item xs={3} style={{background: "#dbdbdb52"}}>
          <List>
          {this.state.students.map(student => 
            <ListItem alignItems="flex-start" key={"student_" + student.id} button onClick={() => this.setState({selectedStudent: student})}>
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
    return(student && <Card variant="outlined">
      <CardContent>
        <CardHeader 
        style={{background: "#dbdbdb", height:"25px"}}
        title={student.firstName + " " + student.middleName + " " + student.lastName}
        action={
          <IconButton onClick={this.editStudent}>
            <EditIcon />
          </IconButton>
        }
        titleTypographyProps = {{variant: "h5"}}
        />
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