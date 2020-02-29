export default {
    root: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid black',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: 1
        }
    },
    colors: {
        backgroundColor: '#dae1e3',
        height: '9.3rem',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0',
        position: 'relative',
        marginBottom: '-0.3rem'
    },
    deleteIcon: {
        color: 'white',
        backgroundColor: "#eb3d30",
        width: '1.4rem',
        height: '1.4rem',
        position: 'absolute',
        right: '0',
        top: '0',
        zIndex: '10',
        opacity: '0',
        padding: '10px',
        transition: 'opacity .3s ease-out'
    }
}