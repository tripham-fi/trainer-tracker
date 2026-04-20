import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navigation() {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Personal Trainer
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          variant={location.pathname === "/" ? "outlined" : "text"}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/customers"
          variant={location.pathname === "/customers" ? "outlined" : "text"}
        >
          Customers
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/trainings"
          variant={location.pathname === "/trainings" ? "outlined" : "text"}
        >
          Trainings
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
