import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiCardHeader: {
      title: { fontSize: 18 },
      root: { paddingBottom: 0 },
    },
    MuiCard: { root: { borderRadius: 12 } },
    MuiLink: {
      root: {
        color: "black",
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
  },
  props: { MuiLink: { underline: "none" } },
});
