import chroma from 'chroma-js';
import sizes from './sizes';

export default {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-0.35rem',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        },
        [sizes.down('lg')]: {
            width: '25%',
            height: '20%'
        },
        [sizes.down('md')]: {
            width: '50%',
            height: '10%'
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0',
        padding: '10px',
        color: props => 
                chroma(props.color).luminance() <= 0.08 ? 'rgba(255,255,255,.6)' : 'rgba(0, 0, 0, 0.6)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '0.9rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
};