import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
    ].join(','),
    h1: {
      fontFamily: 'Oswald',
      fontWeight: 600
    },
    h2: {
      fontFamily: 'Oswald',
      fontWeight: 600
    },
    h3: {
      fontFamily: 'Oswald',
      fontWeight: 500
    },
    h4: {
      fontFamily: 'Oswald',
      fontWeight: 500
    },
    h5: {
      fontFamily: 'Oswald',
      fontWeight: 400
    },
    h6: {
      fontFamily: 'Oswald',
      fontWeight: 400
    }
  },
  palette: {
    primary: {
      main: '#195EA9',
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
});

export default theme;