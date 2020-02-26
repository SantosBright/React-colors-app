import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-5.8px',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
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
        fontSize: '0.9rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
}

const DraggableColorBox = SortableElement(({ color, classes, name, handleDeleteColor }) => {
    return (
        <div
           className={classes.root}
           style={{ backgroundColor: color }}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon
                    onClick={handleDeleteColor}
                    className={classes.deleteIcon}
                />
            </div>
        </div>
    );
});

export default withStyles(styles)(DraggableColorBox);