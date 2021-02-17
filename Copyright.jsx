import React from "react";

import { Typography, Link } from "@material-ui/core";

import ops from "../operations";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={ops.website} target="blank">
        {ops.copyright}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
