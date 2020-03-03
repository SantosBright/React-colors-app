import chroma from 'chroma-js';
import sizes from './sizes';

export default {
    ColorBox: {
        width: '20%',
        height: props => props.showFullPalette ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-0.25rem',
        '&:hover button': {
            opacity: '1'
        },
        [sizes.down('lg')]: {
            width: '25%',
            height: props => props.showFullPalette ? '20%' : '33.3333%',
        },
        [sizes.down('md')]: {
            width: '50%',
            height: props => props.showFullPalette ? '10%' : '20%',
            // marginBottom: '-0.255rem'
        },
        [sizes.down('xs')]: {
            width: '100%',
            height: props => props.showFullPalette ? '5%' : '10%',
            marginBottom: props => props.showFullPalette ? '-0.256rem' : '-0.289rem'
        }
    },
    copyText: {
        color: props => 
                chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.6)' : 'white'
    },
    colorName: {
        color: props =>
                chroma(props.background).luminance() <= 0.08 ? 'white' : 'rgba(0, 0, 0, 0.6)'
    },
    seeMore: {
        color: props =>
            chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.6)' : 'white',
        backgroundColor: 'rgba(255, 255, 255, .3)',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',
        fontSize: '12px',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase'
    },
    copyButton: {
        color: props => 
            chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.6)' : 'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        cursor: 'pointer',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        border: 'none',
        background: 'rgba(255, 255, 255, .3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textTransform: 'uppercase',
        transition: 'opacity .3s ease-out',
        textDecoration: 'none',
        opacity: '0'
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0',
        padding: '10px',
        color: 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center'
        
    },
    copyOverlay: {
        opacity: '0',
        zIndex: '-1',
        width: '100%',
        height: '100%',
        transition: 'transform .6s ease-in-out',
        transform: 'scale(.1)'
    },
    showOverlay: {
        opacity: '1',
        transform: 'scale(50)',
        position: 'absolute',
        zIndex: '10'
    },
    copyMsg: {
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '4rem',
        transform: 'scale(.1)',
        opacity: '0',
        color: 'white',
        '& h1': {
            fontWeight: '400',
            textShadow: '1px 2px black',
            background: 'rgba(255, 255, 255, .2)',
            width: '100%',
            textAlign: 'center',
            marginBottom: '0',
            padding: '1rem',
            textTransform: 'uppercase',
            [sizes.down('xs')]: {
                fontSize: '4.5rem'
            }
        },
        '& p': {
            fontSize: '2rem',
            opacity: '.6'
        }
    },
    showMsg: {
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all .4s ease-in-out .3s'
    }
};