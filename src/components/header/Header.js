import React, {Component} from 'react'
import {AppBar, Toolbar} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

export default class Header extends Component {

    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Gurukul Education Institute
                    </Typography>
                </Toolbar> 
            </AppBar>
        );
    }
}