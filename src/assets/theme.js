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
    MuiFormLabel: { root: { marginBottom: 8 } },
    MuiTextField: { root: { margin: "8px 0" } },
  },
  props: {
    MuiLink: { underline: "none" },
    MuiTextField: { variant: "outlined" },
    MuiSelect: {
      variant: "outlined",
    },
  },
});
