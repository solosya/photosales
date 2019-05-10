import React   from 'react';
import grid from './grid.module.scss';


const col = (props) => {
    let gridClasses = "";

    if (props.classes) {
        gridClasses = props.classes.map( (c) => {
            return grid[c];
        });
    }

    return (
        <div className={gridClasses.join(" ")}>
            {props.children}
        </div>
    )
}

export default col;