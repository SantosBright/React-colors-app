import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import sizes from './sizes';
import bg from './bg.svg';


export default makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    "@global": {
        '.fade-exit': {
            opacity: '1'
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity .5s ease-out'
        }
    },
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // background by SVGBackgrounds.com2
        backgroundColor: "#394bad",
        backgroundImage: `url(${bg})`,
        overflowY: 'scroll'
    },
    container:{
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down("xl")]: {
            width: '60%'
        },
        [sizes.down("lg")]: {
            width: '80%'
        },[sizes.down("xs")]: {
            width: '90%'
        }
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {
            color: 'white'
        },
        '& h1': {
            fontSize: '2rem',
            textShadow: '0 3px 2px black'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '2.5rem',
        margin: '0 auto',
        [sizes.down("md")]: {
            gridTemplateColumns: 'repeat(2, 50%)',
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: 'repeat(1, 100%)',
            gripGap: '0.25rem',
            width: '80%'
        }
    }
});