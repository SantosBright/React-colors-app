import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';
import sizes from './sizes';


const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles(theme => ({
  root: {
      display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
    alignItems: 'center'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  typoHead: {
    marginRight: theme.spacing(2),
    [sizes.down('xs')]: {
      display: 'none'
    }
  },
  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none'
    },
    [sizes.down('xs')]: {
      marginRight: 0
    }
  },
  button: {
    margin: '0 .5rem'
  }
}));

export default useStyles;