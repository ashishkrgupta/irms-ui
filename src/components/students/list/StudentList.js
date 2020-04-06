import React, { Component } from "react"
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Zoom from '@material-ui/core/Zoom';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import StudentSearchBar from './StudentSearchBar'
import classes from './StudentList.module.css'
import {IRMS_SERVICE} from '../../../servers'
import { Link } from 'react-router-dom';

export default class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state.students = this.state.allStudents;
  }

  state = {
    currentPage: 0,
    rowsPerPage: 10,
    students : [],
    allStudents : [],
    selectedStudent: null,
    filter:{enrollmentId:"",firstName:"",middleName:"",lastName:"",class:"",section:"",rollNo:""},
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
    let filter = {...this.state.filter};
    filter[key] = event.target.value;

    let filteredStudent = allStudents.filter(std => { 
      return std.enrollmentId.toLowerCase().indexOf(filter.enrollmentId.toLowerCase()) > -1
            && std.firstName.toLowerCase().indexOf(filter.firstName.toLowerCase()) > -1
            && std.middleName.toLowerCase().indexOf(filter.middleName.toLowerCase()) > -1 
            && std.lastName.toLowerCase().indexOf(filter.lastName.toLowerCase()) > -1 
          /*  && std.class && std.class.toLowerCase().indexOf(filter.class.toLowerCase()) > -1 
            && std.section && std.section.toLowerCase().indexOf(filter.section.toLowerCase()) > -1 
            && std.rollNo && std.rollNo.toLowerCase().indexOf(filter.rollNo.toLowerCase()) > -1 */ ; 
    });

    this.setState({students: filteredStudent, filter});
  }

  handleChangePage = () => {
    
  }

  componentDidUpdate = () => {

  }

  componentDidMount = () => {
    IRMS_SERVICE.get("/students").then(
      resp => {
        console.log(resp);
        let data = resp.data ? resp.data.body ? resp.data.body : [] : [];
        this.setState({allStudents: data, students: data})
      }, 
      error => {
        console.log(error);
      });
  }

  resetFilter = () => {
    this.setState({students:this.state.allStudents, filter:{enrollmentId:"",firstName:"",middleName:"",lastName:"",class:"",section:"",rollNo:""}})
  }

  render = () => {
    return (
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <StudentSearchBar
          //onChange={this.onChangeSearhBar}
          onSearchClick={this.onChangeSearhBar}
        />
        { this.renderTable() }
      </Grid>
    );
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
                value={this.state.filter.enrollmentId}
                inputProps={{ onChange:this.onFilterInputChange, field: "enrollmentId", placeholder:"enrollment id", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                value={this.state.filter.firstName}
                inputProps={{ onChange:this.onFilterInputChange, field: "firstName", placeholder:"first name", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                value={this.state.filter.middleName}
                inputProps={{ onChange:this.onFilterInputChange, field: "middleName", placeholder:"middle name", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                value={this.state.filter.lastName}
                inputProps={{ onChange:this.onFilterInputChange, field: "lastName", placeholder:"last name", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                value={this.state.filter.class}
                inputProps={{ onChange:this.onFilterInputChange, field: "class", placeholder:"class", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                value={this.state.filter.section}
                inputProps={{ onChange:this.onFilterInputChange, field: "section", placeholder:"section", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <InputBase className="width100percent" 
                value={this.state.filter.rollNo}
                inputProps={{ onChange:this.onFilterInputChange, field: "rollNo", placeholder:"roll no", style:{textAlign:"center"}}}
              />
            </TableCell>
            <TableCell align="center" className="padding0px">
              <Tooltip title="Reset Filter"  placement="top" TransitionComponent={Zoom} >
                <IconButton style={{padding: "0px"}} onClick={this.resetFilter}>
                  <BackspaceIcon/>
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
          { this.state.students ? 
          this.state.students.map(student => (
            <TableRow key={student.id}>
              <TableCell align="center">
                <Link to={"/student-detail/" + student.id} style={{textDecoration:"none", color:"#3f51b5"}}>{student.enrollmentId}</Link>
              </TableCell>
              <TableCell align="center">{student.firstName}</TableCell>
              <TableCell align="center">{student.middleName}</TableCell>
              <TableCell align="center">{student.lastName}</TableCell>
              <TableCell align="center">{student.class}</TableCell>
              <TableCell align="center">{student.section}</TableCell>
              <TableCell align="center">{student.rollNo}</TableCell>
              <TableCell align="center" className="padding0px" >
                
                <Link to={"/edit-student/" + student.id}><IconButton><EditIcon/></IconButton></Link>
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
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.currentPage}
        onChangePage={this.handleChangePage}
        //onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>);
  }

  
}