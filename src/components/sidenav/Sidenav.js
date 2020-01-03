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
import classes from './Sidenav.module.css'

class Sidenav extends Component {

    state = {
        menus: [
            {
                title: "Addmission",
                id: "admission",
                icon: <AccountBox/>,
                open: false,
                submenus: [
                    {
                        title: "New Admission",
                        id: "new-admission",
                        icon: <PersonAddIcon/>
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
                        icon: <ReceiptIcon/>
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
                        icon: <ArrowBackIcon/>
                    },
                    {
                        title: "Return Book",
                        id: "return-book",
                        icon: <ArrowForwardIcon/>
                    }
                ]
            }
        ]
    };

    handleMenuClick = (element) => {
        let menus = [...this.state.menus];
        let menuIndex = menus.findIndex(m => {return m.id === element});
        let menu = menus[menuIndex];
        menu.open = !menu.open;
        this.setState({menus});
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
                        <ListItem button onClick={() => this.handleMenuClick(menu.id)} >
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.title} />
                            {menu.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={menu.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {menu.submenus.map(submenu => {
                                return(
                                    <ListItem button onClick={() => this.props.onSubMenuClick(submenu.id)}  className="paddingleft30px" key={submenu.id}>
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