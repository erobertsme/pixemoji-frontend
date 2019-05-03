import React from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, Brush } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//import Drawer from '@material-ui/core/Drawer';
//import List from '@material-ui/core/List';
//import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLink = (ev) => {
    console.log(ev.target)
    // this.props.history.push(ev.target.attributes.url.value);
  }

  handleMenuItem = (ev) => {
    this.handleLink(ev);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit"
              aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              Pixemoji
            </Typography>

            <IconButton url="/draw" onClick={this.handleLink} color="inherit">
              <Brush url="/draw" />
            </IconButton>

            <IconButton
              aria-owns={open ? 'account-menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="account-menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
            {
              auth ?
              [
              <MenuItem url={`/user/${this.state.user}/emojis`} onClick={this.handleLink}>My Emojis</MenuItem>,
              <MenuItem url="/account" onClick={this.handleLink}>My Account</MenuItem>
              ]
              :
              <MenuItem url="/account" onClick={this.handleLink}>Login/Signup</MenuItem>
            }
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Navbar));