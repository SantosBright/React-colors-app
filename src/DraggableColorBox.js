import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

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