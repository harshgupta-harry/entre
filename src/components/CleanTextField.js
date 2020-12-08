import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    fontSize: 16,
  },
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        border: '0px',
      },
    },
  },
});

function CleanTextField(props) {
  return (
    <ThemeProvider theme={theme}>
      <TextField variant="outlined" {...props} />
    </ThemeProvider>
  );
}

export default CleanTextField;
