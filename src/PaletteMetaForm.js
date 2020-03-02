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
    const [stage, setStage] = React.useState("name");
    const [paletteName, setPaletteName] = React.useState("");

    const handleChange =  e => {
        setPaletteName(e.target.value);
    }

    const showEmojiPicker = () => {
        setStage("emoji");
    }

    const savePalette = emoji => {
        console.log(emoji.native);
        let newPalette = {
            paletteName,
            emoji: emoji.native
        };
        handleSubmit(newPalette);
        setStage("");
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
            <Dialog onClose={hideForm} open={stage === 'emoji'}>
                <DialogTitle id="form-dialog-title">Choose an Emoji</DialogTitle>
                <Picker
                    title="Pick a Palette Emoji"
                    onSelect={savePalette}
                    darkMode={false}
                />
            </Dialog>
            <Dialog
                open={stage === 'name'}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please 
                            <span role="img" aria-label="jsx-a11y/accessible-emoji">😉</span> 
                            enter a name for your beautiful
                            <span role="img" aria-label="jsx-a11y/accessible-emoji">👩</span> 
                            Palette. Make sure its unique!<span role="img" aria-label="jsx-a11y/accessible-emoji">✨</span>.
                        </DialogContentText>
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