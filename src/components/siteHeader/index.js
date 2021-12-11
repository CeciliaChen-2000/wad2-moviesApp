import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// import Box from '@material-ui/core/Box';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icon/MoveToInbox';
// import MailIcon from '@material-ui/icon/Mail';

import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { auth } from "../../firebaseAuth/firebaseConfig";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader = ( { history },{currentUser}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuOptions = [
    { label: "Actors", path: "/actors"},
    { label: "Liked Actors", path: "/actors/likes"},
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Top rated", path: "/movies/topRated" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Now playing", path: "/movies/nowPlaying" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Playlist", path: "/movies/playlist" }
  ];

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
          <Link to={`/signup`} underline="none"><Button>SIGN UP</Button></Link>
          {currentUser === undefined ?
            <><Link to={`/login`} underline="none"><Button>LOG IN</Button></Link>
              <Link to={`/login`} underline="none"><Button onClick={() => auth.signOut()}>LOG OUT</Button></Link>
            </>
            :
            <Button onClick={() => auth.signOut()}>LOG OUT</Button>
          }
          {/* whether to LOG IN or LOG OUT */}
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);