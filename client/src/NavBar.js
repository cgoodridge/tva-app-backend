import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const NavBar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return(    
    <div class="container navbar">
        <div class="logo">
            <Link to="/">
                <img src="../images/tva-logo.png" alt="TVA logo" width="130"/>
            </Link>
        </div>
        <nav className="topnav">
            <ul>
              <Hidden mdDown>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/members">Members</Link>
                  </li>
                  <li>
                      <Link to="/timeline">Timeline</Link>
                  </li>
                  <li>
                      <Link to="/about">About</Link>
                  </li>   
              </Hidden>
              <Hidden lgUp>
                <div className="topnav">
                  <IconButton aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                      <MenuIcon className="menuIcon" fontSize="large"/>
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to="/members">Members</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to="/timeline">Timeline</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to="/about">About</Link></MenuItem>
                  </Menu>
                </div>
              </Hidden>
            </ul>
        </nav>
    </div>
  )
}

  

export default NavBar;