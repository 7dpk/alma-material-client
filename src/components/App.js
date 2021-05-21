import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Form from "./Form";
import Leaderboard from "./LeaderBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  tabs: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    visibility: ({ search }) => search,
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(4),
      width: "20ch",
      visibility: ({ search }) => search,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function TabPanel(props) {
  const { children, value, index, setSearch, ...other } = props;
  if (value === 0) {
    setSearch("hidden");
  }
  if (value === 1) {
    setSearch("visible");
  }
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function SearchAppBar() {
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState("hidden");
  const [searchTerm, setSearchTerm] = React.useState("");

  const classes = useStyles({ search });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Student Leaderboard
          </Typography>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Enter Marks" />
            <Tab label="Leaderboard" />
          </Tabs>
          {
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          }
        </Toolbar>
      </AppBar>
      <Box>
        <TabPanel value={value} index={0} setSearch={setSearch}>
          <Form request="POST" student={{}} />
        </TabPanel>
      </Box>
      <Box>
        <TabPanel value={value} index={1} setSearch={setSearch}>
          <Leaderboard searchTerm={searchTerm} />
        </TabPanel>
      </Box>
    </div>
  );
}
