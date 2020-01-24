import React, { Component } from "react"
import Grid from '@material-ui/core/Grid';
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
import InputBase from '@material-ui/core/InputBase';
import StudentSearchBar from './StudentSearchBar'
import classes from './StudentList.module.css'
import {IRMS_SERVICE} from '../../../servers'

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
    return (<Grid container direction="row" justify="flex-start" alignItems="center">
      <StudentSearchBar
        //onChange={this.onChangeSearhBar}
        onSearchClick={this.onChangeSearhBar}
      />
      {this.renderTable()}
    </Grid>);
  }

  componentDidMount = () => {
    IRMS_SERVICE.get("/students").then(
      resp => {
        console.log(resp.data);
        //this.setState({allStudents: resp.data, students: resp.data})
      }, 
      error => {
        console.log(error);
      });
  }

  renderTable = () => {
    return(<Paper className = {classes['.table-container']} style={{width: "calc(100% - 10px)", margin: "0px auto"}} >
      <TableContainer style={{height:"calc( 100% - 200px)"}}>
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
              <InputBase className="width100percent"
                inputProps={{ onChange:this.onFilterInputChange, field: "enrollmentId", placeholder:"enrollment id", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "firstName", placeholder:"first name", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "middleName", placeholder:"middle name", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "lastName", placeholder:"last name", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "class", placeholder:"class", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "section", placeholder:"section", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                inputProps={{ onChange:this.onFilterInputChange, field: "rollNo", placeholder:"roll no", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px"></TableCell>
          </TableRow>
          { this.state.students ? 
          this.state.students.map(student => (
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
          )) 
          :
          <TableRow>
            <TableCell align="center">No Record Found</TableCell>
          </TableRow> }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.students.length}
        rowsPerPage={10}
        page={0}
        //onChangePage={handleChangePage}
        //onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>);
  }

  
}