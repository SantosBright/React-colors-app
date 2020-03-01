import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import MinPalette from './MiniPalette';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from './styles/PaletteListStyles';
import { blue, red } from '@material-ui/core/colors';


function PaletteList(props) {
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");
    const classes = useStyles();
    const { palettes } = props;

    const goToPalette = id => {
        props.history.push(`/palette/${id}`);
    }

    const handleOpen = id => {
        setOpen(true);
        setDeleteId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        props.deletePalette(deleteId);
        handleClose();
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>React Colors</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition
                            key={palette.id}
                            classNames="fade"
                            timeout={500}
                        >
                            <MinPalette
                                {...palette}
                                handleClick={() => goToPalette(palette.id)}
                                key={palette.id}
                                handleOpen={handleOpen}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <Dialog onClose={handleClose} aria-labelledby="delete-dialog-title" open={open}>
                <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                <List>
                    <ListItem button onClick={handleDelete}>
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: blue[100],
                                    color: blue[600]
                                }}
                            >
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Delete" />
                    </ListItem>
                    <ListItem button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: red[100],
                                    color: red[600]
                                }}
                            >
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

export default PaletteList;