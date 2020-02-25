import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ColorPickerForm = props => {
    const { addNewColor, isPaletteFull, colors } = props;
    const [currentColor, setCurrentColor] = useState("teal");
    const [newColorName, setNewColorName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => (
            colors.every(({ name }) => (
                name.toLowerCase() !== value.toLowerCase()
            ))
        ));
        ValidatorForm.addValidationRule('isColorUnique', () => (
            colors.every(({ color }) => (
                color.toLowerCase() !== currentColor.toLowerCase()
            ))
        ));
    });

    const handleNewColorChange = e => {
        setNewColorName(e.target.value);
    }

    const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: newColorName
        };
        addNewColor(newColor);
        setNewColorName('');
    }

    const handleColorChange = newColor => {
        setCurrentColor(newColor.hex);
    }

    return (
        <div>
            <ChromePicker
                color={currentColor}
                onChangeComplete={handleColorChange}
            />
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    value={newColorName}
                    onChange={handleNewColorChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={[
                        'this is field is required',
                        'Color name is already taken',
                        'Color already used'
                    ]}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: isPaletteFull ? 
                        'grey' : currentColor
                    }}
                    type="submit"
                    disabled={isPaletteFull}
                >
                    {isPaletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    );
}

export default ColorPickerForm;