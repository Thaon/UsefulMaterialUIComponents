import React from "react";
import { Avatar, Badge, IconButton, withStyles } from "@material-ui/core";

const MenuIconButton = (props) => {
  const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))(Badge);

  return (
    <React.Fragment>
      {props.selected && (
        <IconButton disabled style={{ backgroundColor: "#eee", color: "#000" }}>
          {props.children}
        </IconButton>
      )}
      {!props.selected && !props.notify && (
        <IconButton
          disabled={props.disabled}
          onClick={() => {
            if (props.onClick) props.onClick();
          }}
        >
          {props.children}
        </IconButton>
      )}
      {!props.selected && props.notify && (
        <IconButton
          disabled={props.disabled}
          onClick={() => {
            if (props.onClick) props.onClick();
          }}
        >
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            variant="dot"
          >
            {props.children}
          </StyledBadge>
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default MenuIconButton;
