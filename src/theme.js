import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
    ].join(','),
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 700
    },
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 700
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 700
    },
    h4: {
      fontFamily: 'Montserrat',
      fontWeight: 700
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 600
    },
    h6: {
      fontFamily: 'Montserrat',
      fontWeight: 600
    }
  },
  palette: {
    primary: {
      main: '#195EA9',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    atenews: {
      news: '#263E8E',
      features: '#FAB417',
      highlight: '#972E34',
      montage: '#40AE4B',
      diversions: '#F9761D'
    }
  },
});

export default theme;