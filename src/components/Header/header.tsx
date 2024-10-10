import { ReactElement } from "react";

import "../../App.css";

import { AppBar, Typography } from "@mui/material";

const Header = (): ReactElement => {
  return (
    <AppBar className="header-Appbar" position="absolute">
      <Typography variant="h5">SIMPLE PRODUCTS DEMO</Typography>
    </AppBar>
  );
};

export default Header;
