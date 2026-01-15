import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 600, color: "text.primary" }}
        >
          Events Dashboard Showcase
        </Typography>

        <Box>
          <IconButton
            aria-label="GitHub repository"
            href="https://github.com/DayPad7/mini-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
