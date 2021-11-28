import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";

const Score = ({ current }) => {
  return (
    <div>
      <List className="scorecard">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <StarIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Our Score"
            secondary={current.score}
            className="rating"
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <div>
            {current.actors.map((item, index) => (
              <Chip
                key={index}
                item={item}
                label={item}
                clickable
                color="primary"
                className="chip"
              />
            ))}
          </div>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MovieIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Director" secondary={current.director} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};

export default Score;
