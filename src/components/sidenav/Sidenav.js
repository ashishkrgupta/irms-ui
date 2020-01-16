import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import classes from './Sidenav.module.css'

class Sidenav extends Component {

    state = {
        menus: [
            {
                title: "Dashboard",
                id: "dashboard",
                icon: <DashboardIcon/>,
                submenus: [],
                selected: false,
            },
            {
                title: "Students 
",
                id: "admission",
                icon: <AccountBox/>,
                open: false,
                submenus: [
                    {
                        title: "New Admission",
                        id: "new-admission",
                        icon: <PersonAddIcon/>,
                        selected: true,
                    },
                    {
                        title: "Student List",
                        id: "new-admission",
                        icon: <PersonAddIcon/>,
                        selected: true,
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
                        selected: false,
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
                        selected: false,
                    },
                    {
                        title: "Return Book",
                        id: "return-book",
                        icon: <ArrowForwardIcon/>,
                        selected: false,
                    }
                ]
            }
        ]
    };

    handleMenuClick = (menuId) => {
        console.log(menuId);
        let menus = [...this.state.menus];
        let menu = menus.find(m => {return m.id === menuId});
        if (menu.selected !== undefined) {
            this.resetSelectedMenus(menus);
            menu.selected = true;
            this.props.onSubMenuClick(menuId);
        }
        if (menu.open !== undefined) {
            menu.open = !menu.open;
        }
        
        this.setState({menus: menus});
    }

    handleSubMenuClick = (menuId, submenuId) => {
        let menus = [...this.state.menus];
        this.resetSelectedMenus(menus);
        let menu = menus.find(m => {return m.id === menuId});
        let submenu = menu.submenus.find(m => {return m.id === submenuId});
        submenu.selected = true;
        this.setState({menus: menus});
        this.props.onSubMenuClick(submenuId);
    }

    resetSelectedMenus = (menus) =>{
        menus.forEach(menu => {
            if(menu.selected) {menu.selected = false;}
            menu.submenus.forEach(submenu => { if(submenu.selected){submenu.selected = false;}});
        });
    }



    render() {
        return (<Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerpaper,
            }}
            >
                {this.state.menus.map(menu => {
                    return(<List component="nav" key={menu.id}className="padding0px">
                        <ListItem 
                            button 
                            selected={menu.selected}
                            onClick={() => this.handleMenuClick(menu.id)} >
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.title} />
                            { menu.submenus.length > 0 && ( menu.open ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        <Collapse in={menu.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {menu.submenus.map(submenu => {
                                return(
                                    <ListItem button
                                        selected={submenu.selected} 
                                        onClick={() => this.handleSubMenuClick(menu.id, submenu.id)}  className="paddingleft30px" key={submenu.id}>
                                        <ListItemIcon>{submenu.icon}</ListItemIcon>
                                        <ListItemText primary={submenu.title} />
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
