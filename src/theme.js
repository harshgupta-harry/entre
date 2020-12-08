import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 15,
  },
  palette: {
    primary: {
      main: '#00C4FF',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: '#0B3593',
        },
        '&$active': {
          color: '#62CAFA',
        },
      },
      text: {
        fill: '#FFF',
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#00caff',
        width: 60,
        height: 5,
        margin: 'auto',
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        color: '#FFFFFF',
        backgroundColor: '#00caff',
        borderRadius: 10,
        minHeight: 20,
        '&$expanded': {
          minHeight: 20,
        },
      },
      content: {
        margin: 5,
        '&$expanded': {
          margin: 5,
        },
      },
      expandIcon: {
        padding: '0 10px',
      },
    },
    MuiExpansionPanel: {
      root: {
        margin: 10,
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 10,
        },
      },
    },
    MuiCollapse: {
      container: {
        backgroundColor: '#F9F9F9',
        color: '#000000',
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 18,
      },
    },
    MuiRadio: {
      root: {
        fontSize: 18,
        padding: '3px 5px',
      },
    },
    MuiCard: {
      root: {
        boxShadow: '-2.724px 5.346px 18px rgba(115, 115, 115, 0.102)',
        borderRadius: '20px',
        marginBottom: '30px',
      },
    },
    MuiCardContent: {
      root: {
        padding: '30px',
      },
    },
    MuiCardHeader: {
      root: {
        alignItems: 'flex-start',
      },
      title: {
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '18px',
      },
      avatar: {
        marginRight: 10,
      },
      action: {
        marginTop: 0,
        marginRight: 0,
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '8px 0px 8px 10px',
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: 16,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40,
      },
    },
    MuiSelect: {
      select: {
        paddingRight: '35px !important',
        fontSize: '19px',
      },
    },
    MuiPickersModal: {
      dialogRootWider: {
        minWidth: '365px',
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: '365px',
      },
    },
    MuiPickerDTToolbar: {
      separator: {
        lineHeight: '36px',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 20,
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#EFEFEF',
      },
    },
    MuiSwitch: {
      switchBase: {
        '&$checked': {
          color: '#00caff',
        },
        '&$checked + $track': {
          backgroundColor: '#00caff',
        },
      },
    },
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
};

theme.typography.h2 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme.typography.h1 = {
  fontSize: '1.7rem',
  '@media (min-width:600px)': {
    fontSize: '2.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.4rem',
  },
};

theme.typography.subtitle2 = {
  fontSize: 16,
  fontWeight: 'normal',
  marginTop: 10,
};

export default theme;
