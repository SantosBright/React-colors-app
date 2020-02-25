import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, handleDeleteColor }) => {
    const colorBoxes = colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          color={color.color}
          name={color.name}
          key={`${color.name}-${i}`}
          handleDeleteColor={handleDeleteColor.bind(this, color.name)}
        />
    ));
    return (
        <div style={{height: '100%'}}>
            {colorBoxes}
        </div>
    );
})

export default DraggableColorList;