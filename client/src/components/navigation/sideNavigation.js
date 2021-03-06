import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  TextField,
  ListItemText
} from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import MailIcon from "@mui/icons-material/Mail";
// import HomeIcon from "@mui/icons-material/Home";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import DashboardIcon from "@mui/icons-material/Dashboard";

const SideDrawer = ({ users, signOutUser }) => {
  const [state, setState] = useState(false);
  return (
    <>
      <DehazeIcon className="drawer_btn" onClick={() => setState(true)} />
      <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
        <form style={{ margin: "20px" }}>
          <TextField
            id="outlined-basic"
            label="Search movie"
            variant="outlined"
          />
        </form>
        <Divider />
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/"
            onClick={() => setState(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/contact"
            onClick={() => setState(false)}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          {!users.auth ? (
            <ListItem
              button
              component={RouterLink}
              to="/auth"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          ) : (
            <ListItem
              button
              // component={RouterLink}
              onClick={() => {
                signOutUser();
                setState(false);
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          )}
        </List>

        {users.auth ? (
          <>
            <Divider />
            <List>
              <ListItem
                button
                component={RouterLink}
                to="/dashboard"
                onClick={() => setState(false)}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </>
        ) : null}
      </Drawer>
    </>
  );
};

export default SideDrawer;
