import sizes from './sizes';

export default {
    Palette: {
        height: '100vh',
        // overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        
    },
    colors: {
        height: '90%'
    },
    goBack: {
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-0.25rem',
        backgroundColor: 'black',
        '& a': {
            color: 'white',
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
            textDecoration: 'none'
        },
        [sizes.down('lg')]: {
            width: '25%',
            height: '33.3333%'
        },
        [sizes.down('md')]: {
            width: '50%',
            height: '20%'
        }
    }
}