import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export default function FormDialog({ palettes, handleSubmit, hideForm }) {
    const [open, setOpen] = React.useState(true);
    const [paletteName, setPaletteName] = React.useState("");

    const handleChange =  e => {
        setPaletteName(e.target.value);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
            palettes.every(({ paletteName }) => (
                paletteName.toLowerCase() !== value.toLowerCase()
            ))
        ));
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <ValidatorForm onSubmit={handleSubmit.bind(this, paletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please 😉 enter a name for your beautiful👩 Palette. Make sure its unique!✨.
                        </DialogContentText>
                        <Picker />
                        <TextValidator
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            label="Palette Name"
                            value={paletteName}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                            'Palette name is required',
                            'Palette name already taken'
                            ]}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}