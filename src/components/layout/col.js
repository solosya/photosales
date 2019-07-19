import React   from 'react';
import grid from './grid.module.scss';


const col = (props) => {
    let gridClasses = "";
    let inline = {};

    if (props.marginBottom) {
        inline['marginBottom'] = props.marginBottom;
    }

    if (props.classes) {
        gridClasses = props.classes.map( (c) => {
            return grid[c];
        });
    }

    return (
        <div className={gridClasses.join(" ")} style={inline}>
            {props.children}
        </div>
    )
}

export default col;