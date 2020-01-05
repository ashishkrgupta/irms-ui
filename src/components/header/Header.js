import React, {Component} from 'react'
import {AppBar, Toolbar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import classes from './Header.module.css'

export default class Header extends Component {

    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Avatar alt="GSS" src="/GSS-PNG.png" />
                    <Typography variant="h6" noWrap>
                        Gurukul Education Institute
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                        </IconButton>
                        <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        //onClick={handleProfileMenuOpen}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar> 
            </AppBar>
        );
    }
}