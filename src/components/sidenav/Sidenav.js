import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DnsIcon from '@material-ui/icons/Dns';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import AccountBox from '@material-ui/icons/AccountBox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SubjectIcon from '@material-ui/icons/Subject';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { NavLink } from 'react-router-dom';
import classes from './Sidenav.module.css'

class Sidenav extends Component {

    state = {
        menus: [
            {
                title: "Dashboard",
                id: "dashboard",
                icon: <DashboardIcon/>,
                submenus: [],
                link: "/",
            },
            {
                title: "Students",
                id: "admission",
                icon: <AccountBox/>,
                open: true,
                submenus: [
                    {
                        title: "New Admission",
                        id: "new-admission",
                        icon: <PersonAddIcon/>,
                        link: "/new-student",
                    },
                    {
                        title: "Student List",
                        id: "student-list",
                        icon: <DnsIcon/>,
                        link: "/student-list",
                    }
                ]
            },
            {
                title: "Accounts",
                id: "accounts",
                icon: <SubjectIcon/>,
                open: false,
                submenus: [
                    {
                        title: "Fee Receipt",
                        id: "fee-receipt",
                        icon: <ReceiptIcon/>,
                        link: "/fee-receipt",
                    }
                ]
            },
            {
                title: "Library",
                id: "library",
                icon: <LibraryBooksIcon/>,
                open: false,
                submenus: [
                    {
                        title: "Issue Book",
                        id: "issue-book",
                        icon: <ArrowBackIcon/>,
                        link: "/library/issue",
                    },
                    {
                        title: "Return Book",
                        id: "return-book",
                        icon: <ArrowForwardIcon/>,
                        link: "/library/return",
                    }
                ]
            }
        ]
    };

    handleMenuClick = (menuId) => {
        console.log(menuId);
        let menus = [...this.state.menus];
        let menu = menus.find(m => {return m.id === menuId});
        if (menu.open !== undefined) {
            menu.open = !menu.open;
        } 
        this.setState({menus: menus});
    }

    render() {

        let linkStyle = {
            textDecoration: "none",
            width: "100%",
            display: "flex",
            color: "#4d4d4d",
            padding: "8px 10px 8px 30px",
        };
        return (<Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerpaper,
            }}
            >
                {this.state.menus.map(menu => {
                    return(<List component="nav" key={menu.id} className="padding0px">
                        <ListItem 
                            button 
                            style={ menu.submenus.length === 0 ? {padding:"0px"} : {} }
                            onClick={() => this.handleMenuClick(menu.id)} >
                            {menu.submenus.length === 0 && (<NavLink to={menu.link} style={{...linkStyle, padding:"8px 16px"}}>
                                <ListItemIcon style={{minWidth: '30px'}}>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.title} />
                            </NavLink>)}
                            {menu.submenus.length > 0 && [<ListItemIcon key="1" style={{minWidth: '30px'}}>{menu.icon}</ListItemIcon>,
                            <ListItemText key="2" primary={menu.title} />]}
                            { menu.submenus.length > 0 && ( menu.open ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        <Collapse in={menu.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {menu.submenus.map(submenu => {
                                return(
                                    <ListItem button
                                        style={{padding:"0px"}}
                                        //onClick={() => this.handleSubMenuClick(menu.id, submenu.id)} 
                                        key={submenu.id} >
                                        <NavLink to={submenu.link} style = {linkStyle}>
                                        <ListItemIcon style={{minWidth: '30px'}}>{submenu.icon}</ListItemIcon>
                                        <ListItemText primary={submenu.title}/>
                                        </NavLink>
                                    </ListItem>
                                );
                            })}
                            </List>
                        </Collapse>
                        <Divider/>
                    </List>);
                })}
            </Drawer>
        );
    }
}
export default Sidenav;
